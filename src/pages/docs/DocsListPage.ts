import { loadDocsList } from '@/domains/docs/list/controller/docsListController';
import type { DocItem } from '@/domains/docs/types/docs.types';

const renderDocCard = (doc: DocItem): string => `
  <a href="/docs/${doc.slug}" class="docs-list-card">
    <span class="docs-list-card-category">${doc.category}</span>
    <span class="docs-list-card-title">${doc.title}</span>
  </a>
`;

const renderCategorySection = (category: string, docs: DocItem[]): string => `
  <section class="docs-list-section">
    <h2 class="docs-list-section-title">${category}</h2>
    <div class="docs-list-grid">
      ${docs.map(renderDocCard).join('')}
    </div>
  </section>
`;

export class DocsListPage {
  private root: HTMLElement;

  constructor(root: HTMLElement) {
    this.root = root;
  }

  async render(): Promise<void> {
    this.root.innerHTML = `<div class="docs-loading">불러오는 중...</div>`;

    try {
      const docList = await loadDocsList();

      const grouped = docList.reduce<Record<string, DocItem[]>>((acc, doc) => {
        const key = doc.category || '기타';
        if (!acc[key]) acc[key] = [];
        acc[key].push(doc);
        return acc;
      }, {});

      this.root.innerHTML = `
        <main class="docs-list-page">
          <h1 class="docs-list-title">Documents</h1>
          ${Object.entries(grouped)
            .map(([cat, docs]) => renderCategorySection(cat, docs))
            .join('')}
        </main>
      `;
    } catch {
      this.root.innerHTML = `<p class="docs-error">문서 목록을 불러올 수 없습니다.</p>`;
    }
  }
}
