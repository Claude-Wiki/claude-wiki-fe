import { postRepository } from '@/shared/lib/firebase/postRepository';

export const getPostList = async () => {
  const posts = await postRepository.getAllPublished('blog');
  return posts.sort((a, b) => b.createdAt.toMillis() - a.createdAt.toMillis());
};
