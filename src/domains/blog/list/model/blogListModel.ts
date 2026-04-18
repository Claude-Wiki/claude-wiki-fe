import { collection, getDocs, limit, orderBy, query, startAfter, where } from 'firebase/firestore';
import { db } from '@/shared/lib/firebase/client';
import type { BlogListQuery, BlogListResult, BlogPost } from '@/domains/blog/types/blog.types';

const PAGE_SIZE = 10;

const toDate = (value: { toDate(): Date } | Date): Date =>
  value instanceof Date ? value : value.toDate();

export const fetchPublishedBlogPosts = async ({
  cursor,
  pageSize = PAGE_SIZE,
}: BlogListQuery = {}): Promise<BlogListResult> => {
  const conditions = [
    where('published', '==', true),
    orderBy('createdAt', 'desc'),
    limit(pageSize),
    ...(cursor ? [startAfter(cursor)] : []),
  ];

  const q = query(collection(db, 'posts'), ...conditions);
  const snap = await getDocs(q);

  const posts: BlogPost[] = snap.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      title: data.title,
      slug: data.slug,
      category: data.category,
      tags: data.tags ?? [],
      thumbnail: data.thumbnail,
      author: data.author,
      createdAt: toDate(data.createdAt),
    };
  });

  const nextCursor = snap.docs.length === pageSize ? snap.docs[snap.docs.length - 1] : null;

  return { posts, nextCursor };
};
