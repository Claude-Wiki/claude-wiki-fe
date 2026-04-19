import { loadDocDetail } from '@/domains/docs/detail/controller/docDetailController';
import { TocScrollSpy } from '@/domains/docs/detail/TocScrollSpy';
import { DocsDetailView } from '@/domains/docs/detail/view/DocsDetailView';
import { loadDocsList } from '@/domains/docs/list/controller/docsListController';

export class DocsDetailPage {
  private root: HTMLElement;
  private slug: string;
  private scrollSpy: TocScrollSpy | null = null;

  constructor(root: HTMLElement, slug: string) {
    this.root = root;
    this.slug = slug;
  }

  async render(): Promise<void> {
    this.scrollSpy?.destroy();
    this.root.innerHTML = `<div class="docs-loading">불러오는 중...</div>`;

    try {
      const [docList] = await Promise.all([loadDocsList()]);
      const view = new DocsDetailView(this.root);
      await loadDocDetail(this.slug, view, docList);

      const article = this.root.querySelector('.docs-content');
      const tocNav = this.root.querySelector('.docs-toc-nav');
      if (article && tocNav) {
        this.scrollSpy = new TocScrollSpy(article, tocNav);
      }
    } catch {
      this.root.innerHTML = `<p class="docs-error">문서를 찾을 수 없습니다.</p>`;
    }
  }
}
