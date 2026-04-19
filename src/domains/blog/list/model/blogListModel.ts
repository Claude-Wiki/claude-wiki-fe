import { postRepository, type PostCursor } from '@/shared/lib/firebase/postRepository';
import type { PostSummary } from '@/shared/types/post.types';
import { MOCK_POSTS } from '@/shared/api/mockData';

const IS_MOCK = import.meta.env.VITE_USE_MOCK === 'true';

export const getPostList = async (cursor?: PostCursor) => {
  if (IS_MOCK) {
    const posts: PostSummary[] = MOCK_POSTS.filter((p) => p.postType === 'blog');
    return { posts, nextCursor: null, hasMore: false };
  }
  return postRepository.getPublishedList('blog', cursor);
};
