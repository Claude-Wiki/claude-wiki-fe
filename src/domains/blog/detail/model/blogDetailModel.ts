import { postRepository } from '@/shared/lib/firebase/postRepository';
import { MOCK_POSTS } from '@/shared/api/mockData';
import { IS_MOCK } from '@/shared/lib/env';

export const getPostBySlug = async (slug: string) => {
  if (IS_MOCK) {
    const post = MOCK_POSTS.find((p) => p.slug === slug);
    if (!post) throw new Error('Post not found');
    return post;
  }
  return postRepository.getBySlug(slug);
};
