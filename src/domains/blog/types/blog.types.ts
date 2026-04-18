import type { QueryDocumentSnapshot } from 'firebase/firestore';

export type BlogCategory =
  | '전체'
  | '페어 프로그래밍'
  | 'Claude Code'
  | '프롬프트 엔지니어링'
  | '코드 리뷰'
  | '자동화'
  | 'CLAUDE.md'
  | '트러블슈팅';

export type BlogCursor = QueryDocumentSnapshot;

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  category: string;
  tags: string[];
  thumbnail?: string;
  author: {
    uid: string;
    displayName: string;
  };
  createdAt: Date;
}

export interface BlogListQuery {
  cursor?: BlogCursor;
  pageSize?: number;
}

export interface BlogListResult {
  posts: BlogPost[];
  nextCursor: BlogCursor | null;
}
