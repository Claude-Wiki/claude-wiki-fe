import { type Post, type PostSummary } from '@/shared/types/post.types';

const buildTocHtml = (headings: { id: string; text: string }[]): string => {
  if (headings.length === 0) return '';
  const items = headings
    .map(
      (h) =>
        `<li><a href="#${h.id}" data-toc-id="${h.id}" class="block text-[0.8125rem] leading-snug no-underline hover:no-underline transition-colors text-text-secondary hover:text-primary data-[active]:!text-accent data-[active]:font-medium">${h.text}</a></li>`,
    )
    .join('');
  return `
    <aside class="w-[12.5rem] shrink-0 sticky top-0 self-start h-[calc(100dvh-3.5rem-3.75rem)] px-5 py-8 border-l border-border overflow-y-auto flex flex-col gap-2">
      <p class="text-xs font-semibold text-text-muted">On this page</p>
      <ul class="list-none flex flex-col gap-3">${items}</ul>
    </aside>
  `;
};

const extractHeadings = (html: string): { id: string; text: string }[] => {
  const regex = /<h[23][^>]*id="([^"]+)"[^>]*>([^<]+)<\/h[23]>/g;
  const headings: { id: string; text: string }[] = [];
  let match: RegExpExecArray | null;
  while ((match = regex.exec(html)) !== null) {
    headings.push({ id: match[1], text: match[2] });
  }
  return headings;
};

const buildSidebarHtml = (posts: PostSummary[], currentSlug: string): string => {
  const items = posts
    .map((p) => {
      const isActive = p.slug === currentSlug;
      return `
        <a href="/docs/${p.slug}"
          class="flex items-center gap-2.5 py-2 px-3 rounded-md text-[0.8125rem] no-underline hover:no-underline transition-colors ${
            isActive
              ? 'bg-badge-bg text-accent font-medium'
              : 'text-text-secondary hover:bg-black/4'
          }">
          <svg class="shrink-0" width="16" height="16" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
            aria-hidden="true">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
            <polyline points="14 2 14 8 20 8"/>
          </svg>
          <span>${p.title}</span>
        </a>
      `;
    })
    .join('');
  return `
    <aside class="w-[16.25rem] shrink-0 sticky top-0 self-start h-[calc(100dvh-3.5rem-3.75rem)] bg-bg-warm border-r border-border overflow-y-auto py-5 px-4 flex flex-col gap-1">
      <p class="text-xs font-semibold text-primary tracking-[0.5px]">Documents</p>
      <div class="h-2 shrink-0"></div>
      ${items}
    </aside>
  `;
};

export class DocDetailView {
  private container: HTMLElement;
  private scrollHandler: (() => void) | null = null;
  private hashHandler: (() => void) | null = null;

  constructor(container: HTMLElement) {
    this.container = container;
  }

  private cleanupTocScroll(): void {
    if (this.scrollHandler) {
      this.container.removeEventListener('scroll', this.scrollHandler);
      this.scrollHandler = null;
    }
    if (this.hashHandler) {
      window.removeEventListener('hashchange', this.hashHandler);
      this.hashHandler = null;
    }
  }

  private setupTocScroll(): void {
    const headings = Array.from(
      this.container.querySelectorAll<HTMLElement>('[data-prose] h2, [data-prose] h3'),
    );
    const tocLinks = Array.from(
      this.container.querySelectorAll<HTMLAnchorElement>('a[data-toc-id]'),
    );
    if (!headings.length || !tocLinks.length) return;

    const setActive = (id: string) => {
      tocLinks.forEach((link) => {
        const isActive = link.dataset.tocId === id;
        link.toggleAttribute('data-active', isActive);
      });
    };

    const getActiveFromScroll = (): string => {
      let current = headings[0].id;
      for (const h of headings) {
        if (h.getBoundingClientRect().top <= 80) current = h.id;
      }
      return current;
    };

    const onScroll = () => setActive(getActiveFromScroll());

    const onHashChange = () => {
      const hash = window.location.hash.slice(1);
      if (hash && headings.some((h) => h.id === hash)) {
        setActive(hash);
      }
    };

    this.scrollHandler = onScroll;
    this.hashHandler = onHashChange;
    this.container.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('hashchange', onHashChange);

    const initialHash = window.location.hash.slice(1);
    if (initialHash && headings.some((h) => h.id === initialHash)) {
      setActive(initialHash);
    } else {
      setActive(getActiveFromScroll());
    }
  }

  renderLoading(): void {
    this.cleanupTocScroll();
    this.container.innerHTML = `
      <div class="flex flex-col items-center justify-center gap-4 min-h-80 py-16 px-8">
        <div class="w-8 h-8 border-2 border-border border-t-accent rounded-circle animate-spin"
          role="status" aria-label="불러오는 중"></div>
        <p class="text-base text-text-secondary">불러오는 중...</p>
      </div>
    `;
  }

  renderNotFound(): void {
    this.container.innerHTML = `
      <div class="flex flex-col items-center justify-center gap-4 min-h-80 py-16 px-8">
        <p class="text-[4rem] font-bold text-text-muted leading-none">404</p>
        <p class="text-base text-text-secondary">문서를 찾을 수 없습니다.</p>
        <a href="/docs" class="text-sm font-medium text-accent hover:no-underline">문서 목록으로 돌아가기</a>
      </div>
    `;
  }

  renderError(message: string): void {
    this.container.innerHTML = `
      <div class="flex flex-col items-center justify-center gap-4 min-h-80 py-16 px-8">
        <p class="text-base text-text-secondary">오류가 발생했습니다: ${message}</p>
        <a href="/docs" class="text-sm font-medium text-accent hover:no-underline">문서 목록으로 돌아가기</a>
      </div>
    `;
  }

  render(post: Post, contentHtml: string, allDocs: PostSummary[]): void {
    this.cleanupTocScroll();
    const createdAt =
      post.createdAt?.toDate().toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }) ?? '';
    const updatedAt =
      post.updatedAt?.toDate().toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }) ?? '';
    const isUpdated = createdAt !== updatedAt;

    const badgesHtml = post.tags
      .map(
        (tag) =>
          `<span class="inline-flex items-center px-3 py-1 bg-badge-bg text-badge-text text-xs font-medium rounded-pill">${tag}</span>`,
      )
      .join('');

    const headings = extractHeadings(contentHtml);
    const tocHtml = buildTocHtml(headings);
    const sidebarHtml = buildSidebarHtml(allDocs, post.slug);

    this.container.innerHTML = `
      <div class="flex min-h-full">
        ${sidebarHtml}
        <div class="flex-1 min-w-0 py-8 px-12 space-y-6">
          <nav class="text-xs text-text-muted" aria-label="breadcrumb">Docs &gt; ${post.title}</nav>
          <h1 class="text-[2rem] font-bold text-primary leading-[1.25] tracking-[-0.625px]">${post.title}</h1>
          ${badgesHtml ? `<div class="flex flex-wrap gap-2">${badgesHtml}</div>` : ''}
          <div class="flex items-center gap-1.5 text-sm text-text-secondary">
            <span>${post.author.displayName}</span>
            <span class="text-text-muted" aria-hidden="true">·</span>
            <time datetime="${post.createdAt?.toDate().toISOString() ?? ''}">${createdAt}</time>
            ${isUpdated ? `<span class="text-text-muted">수정됨 ${updatedAt}</span>` : ''}
          </div>
          <hr class="border-0 border-t border-border" />
          <div data-prose class="text-sm text-text-secondary leading-[1.6]">${contentHtml}</div>
        </div>
        ${tocHtml}
      </div>
    `;
    this.setupTocScroll();
  }
}
