import { getPostBySlug, getPostsByCategory } from '@/shared/api/postApi';
import type { Post } from '@/shared/types/post.types';

export class DocDetailModel {
  async getPost(slug: string): Promise<Post> {
    return getPostBySlug(slug);
  }

  async getAllDocs(): Promise<Post[]> {
    return getPostsByCategory('docs');
  }
}
