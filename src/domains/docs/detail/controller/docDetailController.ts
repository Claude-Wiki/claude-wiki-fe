import { marked } from '@/lib/markdown/markedConfig';
import { getDocBySlug } from '@/domains/docs/detail/model/docDetailModel';
import { getDocsList } from '@/domains/docs/list/model/docsListModel';
import { DocDetailView } from '@/domains/docs/detail/view/DocDetailView';

export class DocDetailController {
  private view: DocDetailView;

  constructor(container: HTMLElement) {
    this.view = new DocDetailView(container);
  }

  async load(slug: string): Promise<void> {
    this.view.renderLoading();
    try {
      const [post, allDocs] = await Promise.all([getDocBySlug(slug), getDocsList()]);
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
