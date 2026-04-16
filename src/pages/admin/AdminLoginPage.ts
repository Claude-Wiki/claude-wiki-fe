export class AdminLoginPage {
  private root: HTMLElement;

  constructor(root: HTMLElement) {
    this.root = root;
  }

  render(): void {
    this.root.innerHTML = `<main><h1>Admin Login</h1></main>`;
  }
}
