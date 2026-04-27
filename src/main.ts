if (import.meta.env.DEV) {
  import('react-grab');
}

import '@/styles/globals.css';
import { Layout } from '@/shared/layouts/Layout';
import { Router } from '@/router/router';
import { HomePage } from '@/pages/home/HomePage';
import { DocsListPage } from '@/pages/docs/DocsListPage';
import { DocsDetailPage } from '@/pages/docs/DocsDetailPage';
import { BlogListPage } from '@/pages/blog/BlogListPage';
import { BlogListController } from '@/domains/blog/list/controller/blogListController';
import { BlogDetailPage } from '@/pages/blog/BlogDetailPage';
import { AdminLoginPage } from '@/pages/admin/AdminLoginPage';
import { AdminLoginController } from '@/domains/admin/auth/controller/adminLoginController';
import { AdminDashboardPage } from '@/pages/admin/AdminDashboardPage';
import { AdminEditorPage } from '@/pages/admin/AdminEditorPage';
import { subscribeAuthState } from '@/domains/admin/auth/model/authModel';
import { requireAdmin } from '@/shared/lib/authGuard';

Layout.mount();

const root = document.getElementById('root');
if (!root) throw new Error('#root 엘리먼트를 찾을 수 없습니다');

const gnbMount = document.getElementById('gnb-mount');
const footerMount = document.getElementById('footer-mount');

const showLayout = () => {
  if (gnbMount) gnbMount.style.display = '';
  if (footerMount) footerMount.style.display = '';
};

const hideLayout = () => {
  if (gnbMount) gnbMount.style.display = 'none';
  if (footerMount) footerMount.style.display = 'none';
};

const router = new Router(root);

let activeController: { destroy?: () => void } | null = null;

router
  .beforeEach(() => {
    activeController?.destroy?.();
    activeController = null;
  })
  .register('/', () => {
    hideLayout();
    new HomePage(root).render();
  })
  .register('/docs', () => {
    showLayout();
    new DocsListPage(root).render();
  })
  .register('/docs/:slug', ({ slug }) => {
    showLayout();
    new DocsDetailPage(root, slug).render();
  })
  .register('/blog', () => {
    showLayout();
    const controller = new BlogListController(new BlogListPage(root), (path) =>
      router.navigate(path),
    );
    activeController = controller;
    void controller.init();
  })
  .register('/blog/:slug', ({ slug }) => {
    showLayout();
    new BlogDetailPage(root, slug).render();
  })
  .register('/admin', () => {
    showLayout();
    const controller = new AdminLoginController(new AdminLoginPage(root), (path) =>
      router.navigate(path),
    );
    activeController = controller;
    void controller.init();
  })
  .register('/admin/dashboard', () => {
    void (async () => {
      if (!(await requireAdmin((path) => router.navigate(path)))) return;
      showLayout();
      new AdminDashboardPage(root).render();
    })();
  })
  .register('/admin/editor', () => {
    void (async () => {
      if (!(await requireAdmin((path) => router.navigate(path)))) return;
      showLayout();
      new AdminEditorPage(root).render();
    })();
  })
  .register('/admin/editor/:slug', ({ slug }) => {
    void (async () => {
      if (!(await requireAdmin((path) => router.navigate(path)))) return;
      showLayout();
      new AdminEditorPage(root, slug).render();
    })();
  });

// auth 초기화 완료 후 라우터 시작 (Firebase가 localStorage 토큰 복구 완료 신호)
let authInitialized = false;

subscribeAuthState((user) => {
  if (!authInitialized) {
    authInitialized = true;
    router.resolve();
  } else if (!user && location.pathname.startsWith('/admin/')) {
    router.navigate('/admin');
  }
});
