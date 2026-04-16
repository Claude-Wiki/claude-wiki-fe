export class AdminEditorPage {
  private root: HTMLElement;
  private slug: string | undefined;

  constructor(root: HTMLElement, slug?: string) {
    this.root = root;
    this.slug = slug;
  }

  render(): void {
    const title = this.slug ? `Edit: ${this.slug}` : 'New Document';
    this.root.innerHTML = `<main><h1>${title}</h1></main>`;
  }
}
