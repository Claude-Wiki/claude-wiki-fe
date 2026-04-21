import { collection, query, where, orderBy, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase/client';
import type { Post } from '@/shared/types/post.types';
import { MOCK_POSTS } from '@/shared/api/mockData';
import { IS_MOCK } from '@/shared/lib/env';

export const getPostBySlug = async (slug: string): Promise<Post> => {
  if (IS_MOCK) {
    const post = MOCK_POSTS.find((p) => p.slug === slug);
    if (!post) throw new Error('Post not found');
    return post;
  }

  const q = query(
    collection(db, 'posts'),
    where('published', '==', true),
    where('slug', '==', slug),
  );
  const snap = await getDocs(q);
  if (snap.empty) throw new Error('Post not found');
  const docSnap = snap.docs[0];
  return { id: docSnap.id, ...docSnap.data() } as Post;
};

export const getPostsByCategory = async (category: string): Promise<Post[]> => {
  if (IS_MOCK) {
    return MOCK_POSTS.filter((p) => p.category === category);
  }

  const q = query(
    collection(db, 'posts'),
    where('published', '==', true),
    where('category', '==', category),
    orderBy('createdAt', 'desc'),
  );
  const snap = await getDocs(q);
  return snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as Post);
};
