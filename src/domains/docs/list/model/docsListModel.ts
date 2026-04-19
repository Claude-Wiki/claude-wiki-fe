import { postRepository } from '@/shared/lib/firebase/postRepository';
import { MOCK_POSTS } from '@/shared/api/mockData';
import { IS_MOCK } from '@/shared/lib/env';

// category 오름차순 → 사이드바 트리 구성용
export const getDocsList = async () => {
  if (IS_MOCK) return MOCK_POSTS.filter((p) => p.postType === 'docs');
  return postRepository.getAllPublished('docs');
};
