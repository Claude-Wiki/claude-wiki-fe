import { DocDetailController } from '@/domains/docs/detail/controller/docDetailController';

export class DocsDetailPage {
  private root: HTMLElement;
  private slug: string;

  constructor(root: HTMLElement, slug: string) {
    this.root = root;
    this.slug = slug;
  }

  render(): void {
    const controller = new DocDetailController(this.root);
    controller.load(this.slug);
  }
}
