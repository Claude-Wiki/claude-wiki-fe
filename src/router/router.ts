type RouteHandler = (params: Record<string, string>) => void;

interface Route {
  pattern: RegExp;
  paramNames: string[];
  handler: RouteHandler;
}

/**
 * 클라이언트 사이드 SPA 라우터.
 *
 * History API를 사용해 페이지 전환을 관리하며,
 * `popstate` 이벤트와 앵커 클릭 인터셉트를 통해 브라우저 내비게이션을 처리한다.
 */
export class Router {
  private routes: Route[] = [];
  private root: HTMLElement;

  /**
   * @param root 라우트 핸들러가 콘텐츠를 렌더링할 루트 DOM 요소
   */
  constructor(root: HTMLElement) {
    this.root = root;
    window.addEventListener('popstate', () => this.resolve());
    document.addEventListener('click', (e) => this.handleLinkClick(e));
  }

  /**
   * 경로 패턴과 핸들러를 라우터에 등록한다.
   *
   * `:param` 형식의 동적 세그먼트를 지원하며,
   * 매칭 시 파라미터 이름과 값을 핸들러에 전달한다.
   *
   * @param path 등록할 경로 패턴 (예: `/articles/:id`)
   * @param handler 경로 매칭 시 실행할 핸들러. 추출된 파라미터를 인자로 받는다.
   * @returns 메서드 체이닝을 위해 인스턴스 자신을 반환
   */
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

  /**
   * 주어진 경로로 이동하고 히스토리 스택에 새 항목을 추가한다.
   *
   * @param path 이동할 경로 (예: `/articles/1`)
   */
  navigate(path: string): void {
    history.pushState(null, '', path);
    this.resolve();
  }

  /**
   * 현재 URL(`location.pathname`)을 등록된 라우트와 매칭하여 핸들러를 실행한다.
   *
   * 매칭되는 라우트가 없으면 404 화면을 렌더링한다.
   */
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

  /**
   * 문서 전체의 클릭 이벤트를 인터셉트하여 내부 링크(`<a>`) 클릭을 SPA 내비게이션으로 처리한다.
   *
   * 외부 링크(`http://`, `//` 로 시작)는 기본 동작을 유지한다.
   *
   * @param e 클릭 이벤트 객체
   */
  private handleLinkClick(e: MouseEvent): void {
    const target = e.target as HTMLElement;
    const anchor = target.closest('a');
    if (!anchor) return;

    const href = anchor.getAttribute('href');
    if (!href || href.startsWith('http') || href.startsWith('//')) return;

    e.preventDefault();
    this.navigate(href);
  }

  /**
   * 등록된 라우트에 매칭되는 경로가 없을 때 404 메시지를 루트 요소에 렌더링한다.
   */
  private renderNotFound(): void {
    this.root.innerHTML = '<h1>404 — 페이지를 찾을 수 없습니다</h1>';
  }
}
