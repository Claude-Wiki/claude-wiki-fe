import {
  collection,
  doc,
  getDoc,
  getDocs,
  updateDoc,
  writeBatch,
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

// 도메인 모델이 Firestore SDK를 직접 참조하지 않도록 re-export
export type { DocumentSnapshot as PostCursor };
import { db } from './client';
import type {
  Post,
  PostSummary,
  PostAuthor,
  PostHistory,
  PostHistorySummary,
  PostCreateInput,
  PostUpdateInput,
} from '@/shared/types/post.types';

// withConverter로 Firestore ↔ Post 변환 — 타입 단언 없이 경계 처리
const postConverter: FirestoreDataConverter<Post> = {
  toFirestore: ({ id: _id, ...data }) => data,
  fromFirestore: (snapshot: QueryDocumentSnapshot) => {
    const d = snapshot.data();
    return {
      id: snapshot.id,
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

const historyConverter: FirestoreDataConverter<PostHistory> = {
  toFirestore: ({ id: _id, ...data }) => data,
  fromFirestore: (snapshot: QueryDocumentSnapshot) => {
    const d = snapshot.data();
    return {
      id: snapshot.id,
      title: d['title'],
      content: d['content'],
      slug: d['slug'],
      category: d['category'],
      tags: d['tags'],
      author: d['author'],
      published: d['published'],
      editedBy: d['editedBy'],
      editedAt: d['editedAt'],
    };
  },
};

const omitContent = ({ content: _content, ...rest }: Post): PostSummary => rest;
const omitHistoryContent = ({ content: _content, ...rest }: PostHistory): PostHistorySummary => rest;

const postsCol = () => collection(db, 'posts').withConverter(postConverter);
const postDoc = (id: string) => doc(db, 'posts', id).withConverter(postConverter);
const historyCol = (postId: string) =>
  collection(db, 'posts', postId, 'history').withConverter(historyConverter);
const historyDoc = (postId: string, historyId: string) =>
  doc(db, 'posts', postId, 'history', historyId).withConverter(historyConverter);

export const postRepository = {
  async getById(id: string): Promise<Post> {
    const snap = await getDoc(postDoc(id));
    if (!snap.exists()) throw new Error(`post not found: ${id}`);
    return snap.data();
  },

  async getBySlug(slug: string, publishedOnly = true): Promise<Post> {
    const constraints = publishedOnly
      ? [where('slug', '==', slug), where('published', '==', true)]
      : [where('slug', '==', slug)];
    const snap = await getDocs(query(postsCol(), ...constraints));
    if (snap.empty) throw new Error(`post not found: ${slug}`);
    return snap.docs[0].data();
  },

  async getPublishedList(
    cursor?: DocumentSnapshot,
    pageSize = 12,
  ): Promise<{ posts: PostSummary[]; nextCursor: DocumentSnapshot | null; hasMore: boolean }> {
    const base = query(
      postsCol(),
      where('published', '==', true),
      orderBy('createdAt', 'desc'),
      limit(pageSize),
    );
    const q = cursor ? query(base, startAfter(cursor)) : base;
    const snap = await getDocs(q);
    return {
      posts: snap.docs.map(d => omitContent(d.data())),
      nextCursor: snap.docs.at(-1) ?? null,
      hasMore: snap.docs.length === pageSize,
    };
  },

  /** 공개 글 전체 — 사이드바 트리용 (카테고리·생성일 오름차순) */
  async getAllPublished(): Promise<PostSummary[]> {
    const snap = await getDocs(
      query(
        postsCol(),
        where('published', '==', true),
        orderBy('category', 'asc'),
        orderBy('createdAt', 'asc'),
      ),
    );
    return snap.docs.map(d => omitContent(d.data()));
  },

  /** 어드민 전용: 초안 포함 전체 */
  async getAll(): Promise<PostSummary[]> {
    const snap = await getDocs(query(postsCol(), orderBy('createdAt', 'desc')));
    return snap.docs.map(d => omitContent(d.data()));
  },

  async create(input: PostCreateInput): Promise<string> {
    const slugRef = doc(db, 'slugs', input.slug);
    const postRef = doc(postsCol());

    await runTransaction(db, async tx => {
      const slugSnap = await tx.get(slugRef);
      if (slugSnap.exists()) throw new Error(`slug "${input.slug}" already exists`);
      tx.set(slugRef, { postId: postRef.id });
      tx.set(postRef, { ...input, createdAt: serverTimestamp(), updatedAt: serverTimestamp() });
    });

    return postRef.id;
  },

  async update(id: string, input: PostUpdateInput, editedBy: PostAuthor): Promise<void> {
    const postRef = postDoc(id);

    await runTransaction(db, async tx => {
      const snap = await tx.get(postRef);
      if (!snap.exists()) throw new Error(`post not found: ${id}`);
      const current = snap.data();

      const historyRef = doc(historyCol(id));
      tx.set(historyRef, {
        title: current.title,
        content: current.content,
        slug: current.slug,
        category: current.category,
        tags: current.tags,
        author: current.author,
        published: current.published,
        editedBy,
        editedAt: serverTimestamp(),
      });

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
    const postRef = postDoc(id);
    const snap = await getDoc(postRef);
    if (!snap.exists()) throw new Error(`post not found: ${id}`);

    const { slug } = snap.data();
    const historySnap = await getDocs(historyCol(id));

    const batch = writeBatch(db);
    historySnap.docs.forEach(d => batch.delete(d.ref));
    batch.delete(doc(db, 'slugs', slug));
    batch.delete(postRef);
    await batch.commit();
  },

  async getHistory(postId: string): Promise<PostHistorySummary[]> {
    const snap = await getDocs(
      query(historyCol(postId), orderBy('editedAt', 'desc')),
    );
    return snap.docs.map(d => omitHistoryContent(d.data()));
  },

  async getHistoryDetail(postId: string, historyId: string): Promise<PostHistory> {
    const snap = await getDoc(historyDoc(postId, historyId));
    if (!snap.exists()) throw new Error(`history not found: ${historyId}`);
    return snap.data();
  },
};
