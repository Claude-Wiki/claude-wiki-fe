import { signIn, signOut, checkIsAdmin } from '@/domains/admin/auth/model/authModel';
import type { AdminLoginPage } from '@/pages/admin/AdminLoginPage';

const ERROR_MESSAGES: Record<string, string> = {
  'auth/invalid-credential': '이메일 또는 비밀번호가 올바르지 않습니다.',
  'auth/user-not-found': '이메일 또는 비밀번호가 올바르지 않습니다.',
  'auth/wrong-password': '이메일 또는 비밀번호가 올바르지 않습니다.',
  'auth/too-many-requests': '로그인 시도가 너무 많습니다. 잠시 후 다시 시도해주세요.',
  'auth/network-request-failed': '네트워크 오류가 발생했습니다. 연결을 확인해주세요.',
  DEFAULT: '로그인 중 오류가 발생했습니다.',
};

export class AdminLoginController {
  private page: AdminLoginPage;
  private navigate: (path: string) => void;

  constructor(page: AdminLoginPage, navigate: (path: string) => void) {
    this.page = page;
    this.navigate = navigate;
  }

  async init(): Promise<void> {
    const alreadyAdmin = await checkIsAdmin();
    if (alreadyAdmin) {
      this.navigate('/admin/dashboard');
      return;
    }

    this.page.render();
    this.attachFormListener();
  }

  destroy(): void {}

  private attachFormListener(): void {
    const form = this.page.getForm();
    if (!form) return;
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      void this.handleSubmit();
    });
  }

  private async handleSubmit(): Promise<void> {
    this.page.clearError();

    const email = this.page.getEmailInput()?.value.trim() ?? '';
    const password = this.page.getPasswordInput()?.value ?? '';

    if (!email || !password) {
      this.page.showError('이메일과 비밀번호를 모두 입력해주세요.');
      return;
    }

    this.page.setLoading(true);

    try {
      await signIn(email, password);

      const isAdmin = await checkIsAdmin();
      if (!isAdmin) {
        await signOut();
        this.page.showError('관리자 권한이 없습니다.');
        this.page.setLoading(false);
        return;
      }

      this.navigate('/admin/dashboard');
    } catch (err: unknown) {
      const code = (err as { code?: string }).code ?? '';
      const message = ERROR_MESSAGES[code] ?? ERROR_MESSAGES['DEFAULT'];
      this.page.showError(message);
      this.page.setLoading(false);
    }
  }
}
