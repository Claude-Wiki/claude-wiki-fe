export class BlogListPage {
  private root: HTMLElement;

  constructor(root: HTMLElement) {
    this.root = root;
  }

  render(): void {
    this.root.innerHTML = `<main><h1>Blog</h1></main>`;
  }
}
