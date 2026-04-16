export class HomePage {
  private root: HTMLElement;

  constructor(root: HTMLElement) {
    this.root = root;
  }

  render(): void {
    this.root.innerHTML = `
      <main>
        <h1>Claude Wiki</h1>
      </main>
    `;
  }
}
