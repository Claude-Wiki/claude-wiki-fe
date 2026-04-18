import type { DocContent, DocItem, DocSection } from '@/domains/docs/types/docs.types';

const FILE_TEXT_ICON = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
  <polyline points="14 2 14 8 20 8"/>
  <line x1="16" y1="13" x2="8" y2="13"/>
  <line x1="16" y1="17" x2="8" y2="17"/>
  <polyline points="10 9 9 9 8 9"/>
</svg>`;

const renderSidebarItem = (item: DocItem, isActive: boolean): string => `
  <a
    href="/docs/${item.slug}"
    class="docs-sidebar-item${isActive ? ' is-active' : ''}"
    ${isActive ? 'aria-current="page"' : ''}
  >
    <span class="docs-sidebar-item-icon">${FILE_TEXT_ICON}</span>
    <span class="docs-sidebar-item-text">${item.title}</span>
  </a>
`;

const renderTocItem = (section: DocSection): string => `
  <a
    href="#${section.id}"
    class="docs-toc-item"
  >${section.title}</a>
`;

const renderContentSection = (section: DocSection, html: string): string => `
  <h2 id="${section.id}" class="docs-h2">${section.title}</h2>
  ${html}
`;

export class DocsDetailView {
  private container: HTMLElement;

  constructor(container: HTMLElement) {
    this.container = container;
  }

  render(docList: DocItem[], currentDoc: DocContent, activeSlug: string): void {
    this.container.innerHTML = `
      <div class="docs-layout">
        <aside class="docs-sidebar" aria-label="문서 목록">
          <span class="docs-sidebar-title">Documents</span>
          <nav class="docs-sidebar-nav">
            ${docList.map((item) => renderSidebarItem(item, item.slug === activeSlug)).join('')}
          </nav>
        </aside>

        <article class="docs-content">
          <nav class="docs-breadcrumb" aria-label="브레드크럼">${currentDoc.breadcrumb}</nav>
          <h1 class="docs-title">${currentDoc.title}</h1>
          <div class="docs-badge-row">
            <span class="docs-badge">${currentDoc.category}</span>
          </div>
          <hr class="docs-divider" />
          ${currentDoc.html}
        </article>

        <aside class="docs-toc" aria-label="페이지 목차">
          <span class="docs-toc-label">On this page</span>
          <nav class="docs-toc-nav">
            ${currentDoc.sections.map((section) => renderTocItem(section)).join('')}
          </nav>
        </aside>
      </div>
    `;
  }
}

export { renderContentSection };
