import { marked } from '@/lib/markdown/markedConfig';
import { DocDetailModel } from '@/domains/docs/detail/model/docDetailModel';
import { DocDetailView } from '@/domains/docs/detail/view/DocDetailView';

export class DocDetailController {
  private model: DocDetailModel;
  private view: DocDetailView;

  constructor(container: HTMLElement) {
    this.model = new DocDetailModel();
    this.view = new DocDetailView(container);
  }

  async load(slug: string): Promise<void> {
    this.view.renderLoading();
    try {
      const [post, allDocs] = await Promise.all([
        this.model.getPost(slug),
        this.model.getAllDocs(),
      ]);
      const contentHtml = await marked(post.content);
      this.view.render(post, contentHtml, allDocs);
    } catch (err) {
      if (err instanceof Error && err.message === 'Post not found') {
        this.view.renderNotFound();
      } else {
        this.view.renderError(err instanceof Error ? err.message : '알 수 없는 오류');
      }
    }
  }
}
