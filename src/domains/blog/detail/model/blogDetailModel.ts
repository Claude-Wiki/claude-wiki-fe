import { postRepository } from '@/shared/lib/firebase/postRepository';

export const getPostBySlug = (slug: string) => postRepository.getBySlug(slug);
