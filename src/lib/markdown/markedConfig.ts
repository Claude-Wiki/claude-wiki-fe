import { marked, type Tokens } from 'marked';

const toSlug = (text: string): string =>
  text
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-zA-Z0-9가-힣-]/g, '');

const HEADING_CLASSES: Record<number, string> = {
  2: 'text-[1.375rem] font-semibold text-primary mt-8 mb-3 tracking-[-0.25px]',
  3: 'text-[1.125rem] font-semibold text-primary mt-6 mb-2',
  4: 'text-base font-semibold text-primary mt-5 mb-2',
};

marked.use({
  renderer: {
    heading({ text, depth, tokens }: Tokens.Heading) {
      const id = toSlug(text);
      const content = this.parser.parseInline(tokens);
      const cls = HEADING_CLASSES[depth];
      return `<h${depth} id="${id}"${cls ? ` class="${cls}"` : ''}>${content}</h${depth}>\n`;
    },
    paragraph({ tokens }: Tokens.Paragraph) {
      return `<p class="mb-4">${this.parser.parseInline(tokens)}</p>\n`;
    },
    link({ href, title, tokens }: Tokens.Link) {
      const text = this.parser.parseInline(tokens);
      const titleAttr = title ? ` title="${title}"` : '';
      return `<a href="${href}"${titleAttr} class="text-link underline hover:text-accent-active">${text}</a>`;
    },
    blockquote({ tokens }: Tokens.Blockquote) {
      const body = this.parser.parse(tokens);
      return `<blockquote class="border-l-[3px] border-accent my-4 bg-badge-bg rounded-r-standard py-2 px-4 [&>p]:mb-0 [&>p]:text-text-secondary">\n${body}</blockquote>\n`;
    },
    code({ text, lang }: Tokens.Code) {
      const langClass = lang ? ` language-${lang}` : '';
      return `<pre class="bg-bg-warm rounded-standard p-4 mb-4 overflow-x-auto"><code class="bg-transparent p-0 leading-[1.6] font-mono text-[0.8125rem]${langClass}">${text}</code></pre>\n`;
    },
    codespan({ text }: Tokens.Codespan) {
      return `<code class="font-mono text-[0.8125rem] bg-bg-warm px-1.5 py-0.5 rounded-micro text-primary">${text}</code>`;
    },
    list(token: Tokens.List) {
      const tag = token.ordered ? 'ol' : 'ul';
      const cls = token.ordered ? 'list-decimal pl-6 mb-4' : 'list-disc pl-6 mb-4';
      let body = '';
      for (const item of token.items) {
        body += this.listitem(item);
      }
      return `<${tag} class="${cls}">\n${body}</${tag}>\n`;
    },
    listitem(item: Tokens.ListItem) {
      const content = item.loose
        ? this.parser.parse(item.tokens)
        : this.parser.parseInline(item.tokens);
      return `<li class="mb-1">${content}</li>\n`;
    },
    hr() {
      return `<hr class="border-0 border-t border-border my-6" />\n`;
    },
    table(token: Tokens.Table) {
      let headerCells = '';
      for (const cell of token.header) {
        headerCells += this.tablecell(cell);
      }
      let body = '';
      for (const row of token.rows) {
        let cells = '';
        for (const cell of row) {
          cells += this.tablecell(cell);
        }
        body += `<tr>\n${cells}</tr>\n`;
      }
      return `<table class="w-full border-collapse mb-4 text-sm">\n<thead>\n<tr>\n${headerCells}</tr>\n</thead>\n<tbody>\n${body}</tbody>\n</table>\n`;
    },
    tablecell(token: Tokens.TableCell) {
      const content = this.parser.parseInline(token.tokens);
      const tag = token.header ? 'th' : 'td';
      const base = 'px-3 py-2 border border-border text-left';
      const cls = token.header ? `${base} bg-bg-warm font-semibold text-primary` : base;
      const align = token.align ? ` style="text-align:${token.align}"` : '';
      return `<${tag} class="${cls}"${align}>${content}</${tag}>\n`;
    },
  },
});

export { marked };
