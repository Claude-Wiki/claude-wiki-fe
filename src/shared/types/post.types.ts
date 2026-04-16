import type { Timestamp } from 'firebase/firestore';

export interface PostAuthor {
  uid: string;
  displayName: string;
}

export interface Post {
  id: string;
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

/**
 * posts/{postId}/history/{historyId}
 * 어드민이 수정할 때마다 수정 직전 상태를 스냅샷으로 저장
 */
export interface PostHistory {
  id: string;
  title: string;
  content: string;
  slug: string;
  category: string;
  tags: string[];
  author: PostAuthor;
  published: boolean;
  editedBy: PostAuthor;
  editedAt: Timestamp;
}

/** 히스토리 목록 표시용 — content 제외 */
export type PostHistorySummary = Omit<PostHistory, 'content'>;
