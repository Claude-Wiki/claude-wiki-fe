import {
  collection,
  doc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  runTransaction,
  serverTimestamp,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  type DocumentSnapshot,
  type FirestoreDataConverter,
  type QueryDocumentSnapshot,
} from 'firebase/firestore';
import { db } from './client';
import type {
  Post,
  PostType,
  PostSummary,
  PostCreateInput,
  PostUpdateInput,
} from '@/shared/types/post.types';

// 도메인 모델이 Firestore SDK를 직접 참조하지 않도록 re-export
export type { DocumentSnapshot as PostCursor };

const postConverter: FirestoreDataConverter<Post> = {
  toFirestore: (post) => ({
    postType: post.postType,
    title: post.title,
    content: post.content,
    slug: post.slug,
    category: post.category,
    tags: post.tags,
    author: post.author,
    published: post.published,
    createdAt: post.createdAt,
    updatedAt: post.updatedAt,
  }),
  fromFirestore: (snapshot: QueryDocumentSnapshot) => {
    const d = snapshot.data();
    return {
      id: snapshot.id,
      postType: d['postType'],
      title: d['title'],
      content: d['content'],
      slug: d['slug'],
      category: d['category'],
      tags: d['tags'],
      author: d['author'],
      published: d['published'],
      createdAt: d['createdAt'],
      updatedAt: d['updatedAt'],
    };
  },
};

const omitContent = (post: Post): PostSummary => ({
  id: post.id,
  postType: post.postType,
  title: post.title,
  slug: post.slug,
  category: post.category,
  tags: post.tags,
  author: post.author,
  published: post.published,
  createdAt: post.createdAt,
  updatedAt: post.updatedAt,
});

const postsCol = () => collection(db, 'posts').withConverter(postConverter);
const postDoc = (id: string) => doc(db, 'posts', id).withConverter(postConverter);

export const postRepository = {
  async getById(id: string): Promise<Post> {
    const snap = await getDoc(postDoc(id));
    if (!snap.exists()) throw new Error(`post not found: ${id}`);
    return snap.data();
  },

  async getBySlug(slug: string, publishedOnly = true, postType?: PostType): Promise<Post> {
    const constraints = [
      where('slug', '==', slug),
      ...(publishedOnly ? [where('published', '==', true)] : []),
      ...(postType ? [where('postType', '==', postType)] : []),
    ];
    const snap = await getDocs(query(postsCol(), ...constraints));
    if (snap.empty) throw new Error(`post not found: ${slug}`);
    return snap.docs[0].data();
  },

  /** 공개 글 목록 — postType 기준 필터, 최신순, 커서 기반 페이지네이션 */
  async getPublishedList(
    postType: PostType,
    cursor?: DocumentSnapshot,
    pageSize = 12,
  ): Promise<{ posts: PostSummary[]; nextCursor: DocumentSnapshot | null; hasMore: boolean }> {
    const base = query(
      postsCol(),
      where('published', '==', true),
      where('postType', '==', postType),
      orderBy('createdAt', 'desc'),
      limit(pageSize),
    );
    const q = cursor ? query(base, startAfter(cursor)) : base;
    const snap = await getDocs(q);
    return {
      posts: snap.docs.map((d) => omitContent(d.data())),
      nextCursor: snap.docs[snap.docs.length - 1] ?? null,
      hasMore: snap.docs.length === pageSize,
    };
  },

  /** 공개 글 전체 — postType 기준 필터, 사이드바 트리용 (카테고리·생성일 오름차순) */
  async getAllPublished(postType: PostType): Promise<PostSummary[]> {
    const snap = await getDocs(
      query(
        postsCol(),
        where('published', '==', true),
        where('postType', '==', postType),
        orderBy('category', 'asc'),
        orderBy('createdAt', 'asc'),
      ),
    );
    return snap.docs.map((d) => omitContent(d.data()));
  },

  /** 어드민 전용: 초안 포함 전체 */
  async getAll(): Promise<PostSummary[]> {
    const snap = await getDocs(query(postsCol(), orderBy('createdAt', 'desc')));
    return snap.docs.map((d) => omitContent(d.data()));
  },

  async create(input: PostCreateInput): Promise<string> {
    const slugRef = doc(db, 'slugs', input.slug);
    const postRef = doc(postsCol());

    await runTransaction(db, async (tx) => {
      const slugSnap = await tx.get(slugRef);
      if (slugSnap.exists()) throw new Error(`slug "${input.slug}" already exists`);
      tx.set(slugRef, { postId: postRef.id });
      tx.set(postRef, {
        id: postRef.id,
        ...input,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
    });

    return postRef.id;
  },

  async update(id: string, input: PostUpdateInput): Promise<void> {
    const postRef = postDoc(id);

    await runTransaction(db, async (tx) => {
      const snap = await tx.get(postRef);
      if (!snap.exists()) throw new Error(`post not found: ${id}`);
      const current = snap.data();

      if (input.slug && input.slug !== current.slug) {
        const newSlugRef = doc(db, 'slugs', input.slug);
        if ((await tx.get(newSlugRef)).exists()) {
          throw new Error(`slug "${input.slug}" already exists`);
        }
        tx.delete(doc(db, 'slugs', current.slug));
        tx.set(newSlugRef, { postId: id });
      }

      tx.update(postRef, { ...input, updatedAt: serverTimestamp() });
    });
  },

  async togglePublished(id: string, published: boolean): Promise<void> {
    await updateDoc(postDoc(id), { published, updatedAt: serverTimestamp() });
  },

  async delete(id: string): Promise<void> {
    const snap = await getDoc(postDoc(id));
    if (!snap.exists()) throw new Error(`post not found: ${id}`);
    const { slug } = snap.data();
    await Promise.all([deleteDoc(doc(db, 'posts', id)), deleteDoc(doc(db, 'slugs', slug))]);
  },
};
