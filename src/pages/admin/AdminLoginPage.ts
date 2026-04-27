import './AdminLoginPage.css';

export class AdminLoginPage {
  private root: HTMLElement;

  constructor(root: HTMLElement) {
    this.root = root;
  }

  render(): void {
    this.root.innerHTML = `
      <div class="login-page">
        <div class="login-card">
          <h1 class="login-title">Admin</h1>
          <form class="login-form" novalidate>
            <div class="login-field">
              <input
                type="email"
                id="login-email"
                class="login-input"
                placeholder="이메일"
                autocomplete="email"
                required
              />
            </div>
            <div class="login-field">
              <input
                type="password"
                id="login-password"
                class="login-input"
                placeholder="비밀번호"
                autocomplete="current-password"
                required
              />
            </div>
            <p class="login-error" role="alert" aria-live="polite"></p>
            <button type="submit" class="login-submit">로그인</button>
          </form>
        </div>
        <span class="login-footer-status">
          <span class="login-footer-dot" aria-hidden="true"></span>
          Secure session active
        </span>
      </div>
    `;
  }

  getForm(): HTMLFormElement | null {
    return this.root.querySelector<HTMLFormElement>('.login-form');
  }

  getEmailInput(): HTMLInputElement | null {
    return this.root.querySelector<HTMLInputElement>('#login-email');
  }

  getPasswordInput(): HTMLInputElement | null {
    return this.root.querySelector<HTMLInputElement>('#login-password');
  }

  showError(message: string): void {
    const el = this.root.querySelector<HTMLParagraphElement>('.login-error');
    if (el) el.textContent = message;
  }

  clearError(): void {
    const el = this.root.querySelector<HTMLParagraphElement>('.login-error');
    if (el) el.textContent = '';
  }

  setLoading(loading: boolean): void {
    const btn = this.root.querySelector<HTMLButtonElement>('.login-submit');
    if (!btn) return;
    btn.disabled = loading;
    btn.textContent = loading ? '로그인 중...' : '로그인';
  }
}
