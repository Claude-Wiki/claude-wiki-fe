import './BlogListPage.css';
import type { PostSummary } from '@/shared/types/post.types';
import type { Timestamp } from 'firebase/firestore';

const escape = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const formatDate = (ts: Timestamp): string => {
  const d = ts.toDate();
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`;
};

const renderCard = (post: PostSummary): string => `
  <li class="blog-card" data-slug="${escape(post.slug)}">
    <div class="blog-card-thumbnail"></div>
    <div class="blog-card-body">
      <span class="blog-card-category">${escape(post.category)}</span>
      <h2 class="blog-card-title">${escape(post.title)}</h2>
      <p class="blog-card-meta">${escape(post.author.displayName)} · ${formatDate(post.createdAt)}</p>
    </div>
  </li>
`;

export class BlogListPage {
  private root: HTMLElement;

  constructor(root: HTMLElement) {
    this.root = root;
  }

  render(): void {
    this.root.innerHTML = `
      <div class="blog-page">
        <div class="blog-content">
          <section class="blog-filter-section">
            <div class="blog-header">
              <h1 class="blog-title">블로그</h1>
              <p class="blog-subtitle">클로드 코드 원정대의 인사이트와 경험을 공유합니다</p>
            </div>
            <div class="blog-chips"></div>
            <hr class="blog-divider" />
          </section>

          <section class="blog-feed">
            <ul class="blog-card-list"></ul>
          </section>
        </div>
      </div>
    `;
  }

  renderChips(categories: string[]): void {
    const container = this.root.querySelector<HTMLElement>('.blog-chips');
    if (!container) return;
    container.innerHTML = categories
      .map(
        (cat) =>
          `<button class="blog-chip${cat === '전체' ? ' blog-chip--active' : ''}" data-category="${escape(cat)}">${escape(cat)}</button>`,
      )
      .join('');
  }

  renderPosts(posts: PostSummary[]): void {
    const list = this.root.querySelector<HTMLElement>('.blog-card-list');
    if (!list) return;
    list.insertAdjacentHTML('beforeend', posts.map(renderCard).join(''));
  }

  setActiveChip(category: string): void {
    this.root.querySelectorAll<HTMLButtonElement>('.blog-chip').forEach((btn) => {
      btn.classList.toggle('blog-chip--active', btn.dataset.category === category);
    });
  }

  showSkeleton(): void {
    const list = this.root.querySelector<HTMLElement>('.blog-card-list');
    if (!list) return;
    list.innerHTML = Array(3)
      .fill(
        `<li class="blog-card-skeleton">
          <div class="skeleton-thumbnail"></div>
          <div class="skeleton-body">
            <div class="skeleton-line skeleton-line--short"></div>
            <div class="skeleton-line"></div>
            <div class="skeleton-line skeleton-line--narrow"></div>
          </div>
        </li>`,
      )
      .join('');
  }

  showEmpty(): void {
    const list = this.root.querySelector<HTMLElement>('.blog-card-list');
    if (!list) return;
    list.innerHTML = `<li class="blog-status-message">아직 게시된 글이 없습니다.</li>`;
  }

  showError(onRetry: () => void): void {
    const list = this.root.querySelector<HTMLElement>('.blog-card-list');
    if (!list) return;
    list.innerHTML = `
      <li class="blog-status-message blog-status-message--error">
        <p>글을 불러오는 데 실패했습니다.</p>
        <button class="blog-retry-btn">다시 시도</button>
      </li>
    `;
    list.querySelector('.blog-retry-btn')?.addEventListener('click', onRetry);
  }

  clearPosts(): void {
    const list = this.root.querySelector<HTMLElement>('.blog-card-list');
    if (list) list.innerHTML = '';
  }

  getChipsContainer(): HTMLElement {
    return this.root.querySelector<HTMLElement>('.blog-chips') ?? document.createElement('div');
  }

  getCardList(): HTMLElement | null {
    return this.root.querySelector('.blog-card-list');
  }
}
