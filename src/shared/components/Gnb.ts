export class Gnb {
  private container: HTMLElement;

  constructor() {
    this.container = document.createElement('header');
  }

  render(): HTMLElement {
    window.addEventListener('routechange', () => this.setActiveLink());

    this.container.innerHTML = `
      <nav class="gnb-inner">
        <div class="gnb-left">
          <a href="/" class="gnb-logo" aria-label="Claude Wiki 홈">
            <span class="gnb-logo-mark" aria-hidden="true"></span>
          </a>
          <ul class="gnb-nav-list" role="list">
            <li>
              <a href="/docs" class="gnb-nav-link" data-path="/docs">Docs</a>
            </li>
            <li>
              <a href="/blog" class="gnb-nav-link" data-path="/blog">Blog</a>
            </li>
          </ul>
        </div>

        <label class="gnb-search" aria-label="문서 검색">
          <svg class="gnb-search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <circle cx="11" cy="11" r="8"/>
            <path d="m21 21-4.35-4.35"/>
          </svg>
          <input
            type="search"
            class="gnb-search-input"
            placeholder="Search docs..."
            autocomplete="off"
            spellcheck="false"
          />
        </label>
      </nav>
    `;

    this.setActiveLink();
    return this.container;
  }

  private setActiveLink(): void {
    const path = location.pathname;
    this.container.querySelectorAll<HTMLAnchorElement>('.gnb-nav-link').forEach((link) => {
      const linkPath = link.dataset.path ?? '';
      const isActive = path === linkPath || (linkPath.length > 1 && path.startsWith(linkPath));
      link.classList.toggle('is-active', isActive);
      link.ariaCurrent = isActive ? 'page' : '';
    });
  }
}
