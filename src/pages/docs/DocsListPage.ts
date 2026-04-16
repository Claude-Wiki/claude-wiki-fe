export class DocsListPage {
  private root: HTMLElement;

  constructor(root: HTMLElement) {
    this.root = root;
  }

  render(): void {
    this.root.innerHTML = `<main><h1>Docs</h1></main>`;
  }
}
