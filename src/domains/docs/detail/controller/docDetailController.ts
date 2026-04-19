import { getDocBySlug } from '@/domains/docs/detail/model/docDetailModel';
import type { DocsDetailView } from '@/domains/docs/detail/view/DocsDetailView';
import type { DocContent, DocItem } from '@/domains/docs/types/docs.types';
import { parseMarkdown } from '@/shared/utils/parseMarkdown';

export const loadDocDetail = async (
  slug: string,
  view: DocsDetailView,
  docList: DocItem[],
): Promise<void> => {
  const post = await getDocBySlug(slug);
  const { html, sections } = parseMarkdown(post.content);

  const docContent: DocContent = {
    slug: post.slug,
    title: post.title,
    category: post.category,
    breadcrumb: `Docs &gt; ${post.category} &gt; ${post.title}`,
    sections,
    html,
  };

  view.render(docList, docContent, slug);
};
