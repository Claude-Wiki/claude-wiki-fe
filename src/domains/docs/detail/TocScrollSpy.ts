export class TocScrollSpy {
  private observer: IntersectionObserver;
  private tocLinks: NodeListOf<Element>;
  private activeId: string = '';

  constructor(article: Element, tocNav: Element) {
    this.tocLinks = tocNav.querySelectorAll('.docs-toc-item');

    const headings = Array.from(article.querySelectorAll('h2[id], h3[id]'));

    this.observer = new IntersectionObserver(this.handleIntersect, {
      rootMargin: '-10% 0px -80% 0px',
      threshold: 0,
    });

    headings.forEach((heading) => this.observer.observe(heading));
  }

  private handleIntersect = (entries: IntersectionObserverEntry[]): void => {
    const visibleEntries = entries.filter((entry) => entry.isIntersecting);
    if (visibleEntries.length === 0) return;

    // 여러 헤더가 동시에 교차될 경우 가장 위쪽 헤더를 우선으로 활성화
    const topEntry = visibleEntries.reduce((prev, curr) =>
      prev.boundingClientRect.top < curr.boundingClientRect.top ? prev : curr,
    );

    const id = topEntry.target.id;
    if (id && id !== this.activeId) {
      this.setActive(id);
    }
  };

  private setActive = (id: string): void => {
    this.activeId = id;

    this.tocLinks.forEach((link) => {
      const href = link.getAttribute('href');
      if (href === `#${id}`) {
        link.classList.add('is-active');
      } else {
        link.classList.remove('is-active');
      }
    });
  };

  destroy(): void {
    this.observer.disconnect();
  }
}
