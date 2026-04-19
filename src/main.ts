if (import.meta.env.DEV) {
  import('react-grab');
}

import '@/styles/globals.css';
import { Layout } from '@/shared/layouts/Layout';
import { Router } from '@/router/router';
import { HomePage } from '@/pages/home/HomePage';
import { DocsDetailPage } from '@/pages/docs/DocsDetailPage';
import { BlogListPage } from '@/pages/blog/BlogListPage';
import { BlogDetailPage } from '@/pages/blog/BlogDetailPage';
import { AdminLoginPage } from '@/pages/admin/AdminLoginPage';
import { AdminDashboardPage } from '@/pages/admin/AdminDashboardPage';
import { AdminEditorPage } from '@/pages/admin/AdminEditorPage';

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

router
  .register('/', () => {
    hideLayout();
    new HomePage(root).render();
  })
  .register('/docs', () => {
    router.replace('/docs/getting-start');
  })
  .register('/docs/:slug', ({ slug }) => {
    showLayout();
    new DocsDetailPage(root, slug).render();
  })
  .register('/blog', () => {
    showLayout();
    new BlogListPage(root).render();
  })
  .register('/blog/:slug', ({ slug }) => {
    showLayout();
    new BlogDetailPage(root, slug).render();
  })
  .register('/admin', () => {
    showLayout();
    new AdminLoginPage(root).render();
  })
  .register('/admin/dashboard', () => {
    showLayout();
    new AdminDashboardPage(root).render();
  })
  .register('/admin/editor', () => {
    showLayout();
    new AdminEditorPage(root).render();
  })
  .register('/admin/editor/:slug', ({ slug }) => {
    showLayout();
    new AdminEditorPage(root, slug).render();
  });

router.resolve();
