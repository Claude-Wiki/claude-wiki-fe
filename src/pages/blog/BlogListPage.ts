import './BlogListPage.css';
import { BLOG_CATEGORIES } from '@/domains/blog/list/blogCategory.const';
import type { BlogCategory } from '@/domains/blog/types/blog.types';
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

const renderChips = (active: BlogCategory): string =>
  BLOG_CATEGORIES.map(
    (cat) =>
      `<button class="blog-chip${cat === active ? ' blog-chip--active' : ''}" data-category="${escape(cat)}">${escape(cat)}</button>`,
  ).join('');

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
            <div class="blog-chips">
              ${renderChips('전체')}
            </div>
            <hr class="blog-divider" />
          </section>

          <section class="blog-feed">
            <ul class="blog-card-list"></ul>
            <div class="blog-sentinel" aria-hidden="true"></div>
          </section>
        </div>
      </div>
    `;
  }

  renderPosts(posts: PostSummary[]): void {
    const list = this.root.querySelector<HTMLElement>('.blog-card-list');
    if (!list) return;
    list.insertAdjacentHTML('beforeend', posts.map(renderCard).join(''));
  }

  setActiveChip(category: BlogCategory): void {
    this.root.querySelectorAll<HTMLButtonElement>('.blog-chip').forEach((btn) => {
      btn.classList.toggle('blog-chip--active', btn.dataset.category === category);
    });
  }

  clearPosts(): void {
    const list = this.root.querySelector<HTMLElement>('.blog-card-list');
    if (list) list.innerHTML = '';
  }

  getSentinel(): HTMLElement | null {
    return this.root.querySelector('.blog-sentinel');
  }

  getChips(): NodeListOf<HTMLButtonElement> {
    return this.root.querySelectorAll<HTMLButtonElement>('.blog-chip');
  }

  getCardList(): HTMLElement | null {
    return this.root.querySelector('.blog-card-list');
  }
}
