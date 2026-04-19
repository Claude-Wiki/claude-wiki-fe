import { marked, Renderer } from 'marked';
import type { DocSection } from '@/domains/docs/types/docs.types';

const slugify = (text: string): string =>
  text
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]/g, '');

export const parseMarkdown = (content: string): { html: string; sections: DocSection[] } => {
  const sections: DocSection[] = [];
  const renderer = new Renderer();

  renderer.heading = ({ text, depth }) => {
    if (depth === 2 || depth === 3) {
      const id = slugify(text);
      sections.push({ id, level: depth, title: text });
      return `<h${depth} id="${id}" class="docs-h${depth}">${text}</h${depth}>\n`;
    }
    return `<h${depth}>${text}</h${depth}>\n`;
  };

  renderer.paragraph = ({ text }) => `<p class="docs-p">${text}</p>\n`;

  renderer.code = ({ text }) => `<pre class="docs-code-block"><code>${text}</code></pre>\n`;

  marked.use({ renderer });

  const html = marked(content) as string;
  return { html, sections };
};
