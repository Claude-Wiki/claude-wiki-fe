import { postRepository } from '@/shared/lib/firebase/postRepository';
import type { PostSummary } from '@/shared/types/post.types';
import { MOCK_POSTS } from '@/shared/api/mockData';
import { IS_MOCK } from '@/shared/lib/env';

export const getPostList = async (): Promise<PostSummary[]> => {
  if (IS_MOCK) {
    const posts = MOCK_POSTS.filter((p) => p.postType === 'blog') as PostSummary[];
    return posts.sort((a, b) => b.createdAt.toMillis() - a.createdAt.toMillis());
  }
  const posts = await postRepository.getAllPublished('blog');
  return posts.sort((a, b) => b.createdAt.toMillis() - a.createdAt.toMillis());
};
