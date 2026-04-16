export class AdminDashboardPage {
  private root: HTMLElement;

  constructor(root: HTMLElement) {
    this.root = root;
  }

  render(): void {
    this.root.innerHTML = `<main><h1>Admin Dashboard</h1></main>`;
  }
}
