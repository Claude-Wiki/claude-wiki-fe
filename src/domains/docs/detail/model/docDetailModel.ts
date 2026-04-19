import { postRepository } from '@/shared/lib/firebase/postRepository';

export const getDocBySlug = (slug: string) => postRepository.getBySlug(slug);
