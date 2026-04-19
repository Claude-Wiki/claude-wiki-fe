import { postRepository } from '@/shared/lib/firebase/postRepository';

// category 오름차순 → 사이드바 트리 구성용
export const getDocsList = () => postRepository.getAllPublished('docs');
