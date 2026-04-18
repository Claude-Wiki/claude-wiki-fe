export type { Post, PostSummary, PostAuthor } from '@/shared/types/post.types';
export type { PostCursor } from '@/shared/lib/firebase/postRepository';

export type BlogCategory =
  | '전체'
  | '페어 프로그래밍'
  | 'Claude Code'
  | '프롬프트 엔지니어링'
  | '코드 리뷰'
  | '자동화'
  | 'CLAUDE.md'
  | '트러블슈팅';
