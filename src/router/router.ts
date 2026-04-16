type RouteHandler = (params: Record<string, string>) => void;

interface Route {
  pattern: RegExp;
  paramNames: string[];
  handler: RouteHandler;
}

export class Router {
  private routes: Route[] = [];
  private root: HTMLElement;

  constructor(root: HTMLElement) {
    this.root = root;
    window.addEventListener('popstate', () => this.resolve());
    document.addEventListener('click', (e) => this.handleLinkClick(e));
  }

  register(path: string, handler: RouteHandler): this {
    const paramNames: string[] = [];
    const pattern = new RegExp(
      '^' +
        path.replace(/:([^/]+)/g, (_: string, name: string) => {
          paramNames.push(name);
          return '([^/]+)';
        }) +
        '/?$',
    );
    this.routes.push({ pattern, paramNames, handler });
    return this;
  }

  navigate(path: string): void {
    history.pushState(null, '', path);
    this.resolve();
  }

  resolve(): void {
    const path = location.pathname;
    for (const route of this.routes) {
      const match = path.match(route.pattern);
      if (match) {
        const params: Record<string, string> = {};
        route.paramNames.forEach((name, i) => {
          params[name] = match[i + 1];
        });
        this.root.innerHTML = '';
        route.handler(params);
        return;
      }
    }
    this.renderNotFound();
  }

  private handleLinkClick(e: MouseEvent): void {
    const target = e.target as HTMLElement;
    const anchor = target.closest('a');
    if (!anchor) return;

    const href = anchor.getAttribute('href');
    if (!href || href.startsWith('http') || href.startsWith('//')) return;

    e.preventDefault();
    this.navigate(href);
  }

  private renderNotFound(): void {
    this.root.innerHTML = '<h1>404 — 페이지를 찾을 수 없습니다</h1>';
  }
}
