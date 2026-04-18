import type { Timestamp } from 'firebase/firestore';

export type PostType = 'blog' | 'docs';

export interface PostAuthor {
  uid: string;
  displayName: string;
}

export interface Post {
  id: string;
  postType: PostType;
  title: string;
  content: string;
  slug: string;
  category: string;
  tags: string[];
  author: PostAuthor;
  published: boolean;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

/** 목록 조회용 — content 제외 */
export type PostSummary = Omit<Post, 'content'>;

/** CREATE 입력 — 서버 생성 필드 제외 */
export type PostCreateInput = Omit<Post, 'id' | 'createdAt' | 'updatedAt'>;

/** UPDATE 입력 — 수정 가능 필드만 */
export type PostUpdateInput = Partial<
  Pick<Post, 'title' | 'content' | 'slug' | 'category' | 'tags' | 'published'>
>;
