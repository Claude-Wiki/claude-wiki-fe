import '@/styles/globals.css';
import { Layout } from '@/shared/layouts/Layout';
import { Router } from '@/router/router';
import { HomePage } from '@/pages/home/HomePage';
import { DocsListPage } from '@/pages/docs/DocsListPage';
import { DocsDetailPage } from '@/pages/docs/DocsDetailPage';
import { BlogListPage } from '@/pages/blog/BlogListPage';
import { BlogDetailPage } from '@/pages/blog/BlogDetailPage';
import { AdminLoginPage } from '@/pages/admin/AdminLoginPage';
import { AdminDashboardPage } from '@/pages/admin/AdminDashboardPage';
import { AdminEditorPage } from '@/pages/admin/AdminEditorPage';

Layout.mount();

const root = document.getElementById('root');
if (!root) throw new Error('#root 엘리먼트를 찾을 수 없습니다');

const router = new Router(root);

router
  .register('/', () => new HomePage(root).render())
  .register('/docs', () => new DocsListPage(root).render())
  .register('/docs/:slug', ({ slug }) => new DocsDetailPage(root, slug).render())
  .register('/blog', () => new BlogListPage(root).render())
  .register('/blog/:slug', ({ slug }) => new BlogDetailPage(root, slug).render())
  .register('/admin', () => new AdminLoginPage(root).render())
  .register('/admin/dashboard', () => new AdminDashboardPage(root).render())
  .register('/admin/editor', () => new AdminEditorPage(root).render())
  .register('/admin/editor/:slug', ({ slug }) => new AdminEditorPage(root, slug).render());

router.resolve();
