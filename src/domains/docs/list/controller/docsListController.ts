import { getDocsList } from '@/domains/docs/list/model/docsListModel';
import type { DocItem } from '@/domains/docs/types/docs.types';

export const loadDocsList = async (): Promise<DocItem[]> => {
  const summaries = await getDocsList();
  return summaries.map((post) => ({
    slug: post.slug,
    title: post.title,
    category: post.category,
  }));
};
