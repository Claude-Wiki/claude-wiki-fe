export class Gnb {
  private container: HTMLElement;

  constructor() {
    this.container = document.createElement('header');
  }

  render(): HTMLElement {
    this.container.innerHTML = `
      <nav>
        <a href="/">Claude Wiki</a>
        <ul>
          <li><a href="/docs">Docs</a></li>
          <li><a href="/blog">Blog</a></li>
        </ul>
      </nav>
    `;
    return this.container;
  }
}
