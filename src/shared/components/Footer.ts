export class Footer {
  private container: HTMLElement;

  constructor() {
    this.container = document.createElement('footer');
  }

  render(): HTMLElement {
    this.container.innerHTML = `
      <div class="footer-inner">
        <div class="footer-left">
          <span class="footer-logo-mark" aria-hidden="true"></span>
          <span class="footer-brand">Claude Wiki</span>
          <span class="footer-divider" aria-hidden="true">·</span>
          <span class="footer-copy">© 2026 Woowacourse Claude Code 원정대</span>
        </div>

        <ul class="footer-link-list" role="list">
          <li>
            <a
              href="https://github.com/woowacourse"
              class="footer-link"
              target="_blank"
              rel="noopener noreferrer"
            >GitHub</a>
          </li>
          <li><a href="/blog" class="footer-link">Blog</a></li>
          <li><a href="/about" class="footer-link">About</a></li>
        </ul>
      </div>
    `;
    return this.container;
  }
}
