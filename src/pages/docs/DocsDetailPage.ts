export class DocsDetailPage {
  private root: HTMLElement;
  private slug: string;

  constructor(root: HTMLElement, slug: string) {
    this.root = root;
    this.slug = slug;
  }

  render(): void {
    this.root.innerHTML = `<main><h1>Doc: ${this.slug}</h1></main>`;
  }
}
