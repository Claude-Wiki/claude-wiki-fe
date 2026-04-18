import { getPostList } from '@/domains/blog/list/model/blogListModel';
import type { BlogListPage } from '@/pages/blog/BlogListPage';
import type { BlogCategory } from '@/domains/blog/types/blog.types';
import type { PostSummary } from '@/shared/types/post.types';
import type { PostCursor } from '@/shared/lib/firebase/postRepository';

export class BlogListController {
  private page: BlogListPage;
  private allPosts: PostSummary[] = [];
  private activeCategory: BlogCategory = '전체';
  private cursor: PostCursor | null = null;
  private isLoading = false;

  hasMore = true;

  constructor(page: BlogListPage) {
    this.page = page;
  }

  async init(): Promise<void> {
    this.page.render();
    this.attachChipListeners();
    this.attachCardListeners();
    await this.loadPosts();
  }

  private get filtered(): PostSummary[] {
    if (this.activeCategory === '전체') return this.allPosts;
    return this.allPosts.filter((post) => post.tags.includes(this.activeCategory));
  }

  async loadPosts(): Promise<void> {
    if (this.isLoading || !this.hasMore) return;
    this.isLoading = true;

    const isInitial = this.allPosts.length === 0;
    if (isInitial) this.page.showSkeleton();

    try {
      const result = await getPostList(this.cursor ?? undefined);
      this.allPosts = [...this.allPosts, ...result.posts];
      this.cursor = result.nextCursor;
      this.hasMore = result.hasMore;

      this.page.clearPosts();
      if (this.filtered.length === 0) {
        this.page.showEmpty();
      } else {
        this.page.renderPosts(this.filtered);
      }
    } catch {
      this.page.clearPosts();
      this.page.showError(() => {
        this.hasMore = true;
        void this.loadPosts();
      });
    } finally {
      this.isLoading = false;
    }
  }

  private attachChipListeners(): void {
    this.page.getChips().forEach((btn) => {
      btn.addEventListener('click', () => {
        const category = btn.dataset.category as BlogCategory;
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
    });
  }

  private attachCardListeners(): void {
    this.page.getCardList()?.addEventListener('click', (e) => {
      const card = (e.target as HTMLElement).closest<HTMLElement>('.blog-card');
      if (!card?.dataset.slug) return;
      // Phase 5에서 Router.navigate 연결
    });
  }

  getSentinel(): HTMLElement | null {
    return this.page.getSentinel();
  }
}
