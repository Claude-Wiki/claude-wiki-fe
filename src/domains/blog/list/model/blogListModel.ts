import { postRepository, type PostCursor } from '@/shared/lib/firebase/postRepository';

export const getPostList = (cursor?: PostCursor) => postRepository.getPublishedList('blog', cursor);
