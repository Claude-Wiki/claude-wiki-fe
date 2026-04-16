export class Footer {
  private container: HTMLElement;

  constructor() {
    this.container = document.createElement('footer');
  }

  render(): HTMLElement {
    this.container.innerHTML = `
      <p>© 2025 Claude Wiki — 우아한테크코스 클로드 코드 원정대</p>
    `;
    return this.container;
  }
}
