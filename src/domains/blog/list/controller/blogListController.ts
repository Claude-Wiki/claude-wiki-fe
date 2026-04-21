import { getPostList } from '@/domains/blog/list/model/blogListModel';
import type { BlogListPage } from '@/pages/blog/BlogListPage';
import type { PostSummary } from '@/shared/types/post.types';

export class BlogListController {
  private page: BlogListPage;
  private navigate: (path: string) => void;
  private allPosts: PostSummary[] = [];
  private activeCategory = '전체';

  constructor(page: BlogListPage, navigate: (path: string) => void) {
    this.page = page;
    this.navigate = navigate;
  }

  async init(): Promise<void> {
    this.page.render();
    this.attachChipListeners();
    this.attachCardListeners();
    await this.loadPosts();
  }

  destroy(): void {}

  private get filtered(): PostSummary[] {
    if (this.activeCategory === '전체') return this.allPosts;
    return this.allPosts.filter((post) => post.tags.includes(this.activeCategory));
  }

  async loadPosts(): Promise<void> {
    this.page.showSkeleton();
    try {
      this.allPosts = await getPostList();
      const categories = ['전체', ...new Set(this.allPosts.flatMap((p) => p.tags))];
      this.page.renderChips(categories);
      if (this.allPosts.length === 0) {
        this.page.showEmpty();
      } else {
        this.page.renderPosts(this.allPosts);
      }
    } catch {
      this.page.clearPosts();
      this.page.showError(() => void this.loadPosts());
    }
  }

  private attachChipListeners(): void {
    this.page.getChipsContainer().addEventListener('click', (e) => {
      const btn = (e.target as HTMLElement).closest<HTMLButtonElement>('.blog-chip');
      if (!btn?.dataset.category) return;
      const category = btn.dataset.category;
      if (category === this.activeCategory) return;
      this.activeCategory = category;
      this.page.setActiveChip(category);
      this.page.clearPosts();
      if (this.filtered.length === 0) {
        this.page.showEmpty();
      } else {
        this.page.renderPosts(this.filtered);
      }
    });
  }

  private attachCardListeners(): void {
    this.page.getCardList()?.addEventListener('click', (e) => {
      const card = (e.target as HTMLElement).closest<HTMLElement>('.blog-card');
      if (!card?.dataset.slug) return;
      this.navigate(`/blog/${card.dataset.slug}`);
    });
  }
}
