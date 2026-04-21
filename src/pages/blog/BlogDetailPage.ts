import { BlogDetailController } from '@/domains/blog/detail/controller/blogDetailController';

export class BlogDetailPage {
  private root: HTMLElement;
  private slug: string;

  constructor(root: HTMLElement, slug: string) {
    this.root = root;
    this.slug = slug;
  }

  render(): void {
    const controller = new BlogDetailController(this.root);
    controller.load(this.slug);
  }
}
