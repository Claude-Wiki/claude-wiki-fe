import { marked } from '@/lib/markdown/markedConfig';
import { BlogDetailModel } from '@/domains/blog/detail/model/blogDetailModel';
import { PostDetailView } from '@/shared/components/PostDetailView';

export class BlogDetailController {
  private model: BlogDetailModel;
  private view: PostDetailView;

  constructor(container: HTMLElement) {
    this.model = new BlogDetailModel();
    this.view = new PostDetailView(container);
  }

  async load(slug: string): Promise<void> {
    this.view.renderLoading();
    try {
      const post = await this.model.getPost(slug);
      const contentHtml = await marked(post.content);
      this.view.render(post, contentHtml, '/blog');
    } catch (err) {
      if (err instanceof Error && err.message === 'Post not found') {
        this.view.renderNotFound();
      } else {
        this.view.renderError(err instanceof Error ? err.message : '알 수 없는 오류');
      }
    }
  }
}
