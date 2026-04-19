import { postRepository, type PostCursor } from '@/shared/lib/firebase/postRepository';
import type { PostCreateInput, PostUpdateInput } from '@/shared/types/post.types';

export type { PostCreateInput, PostUpdateInput };

/** 대시보드 — 문서 목록 (에디터 진입점 선택용) */
export const getPostList = (cursor?: PostCursor) => postRepository.getPublishedList('blog', cursor);
export const getAllPosts = () => postRepository.getAll();

/** 에디터 — 기존 문서 로드 */
export const getPostForEdit = (id: string) => postRepository.getById(id);

/** 에디터 — 새 문서 작성 */
export const createPost = (input: PostCreateInput) => postRepository.create(input);

/** 에디터 — 수정 */
export const updatePost = (id: string, input: PostUpdateInput) => postRepository.update(id, input);

/** 에디터 — 발행 토글 */
export const togglePublished = (id: string, published: boolean) =>
  postRepository.togglePublished(id, published);
