import { getPostBySlug } from '@/shared/api/postApi';
import type { Post } from '@/shared/types/post.types';

export class BlogDetailModel {
  async getPost(slug: string): Promise<Post> {
    return getPostBySlug(slug);
  }
}
