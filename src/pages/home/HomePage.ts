import './HomePage.css';

export class HomePage {
  private root: HTMLElement;
  private animationIntervals: ReturnType<typeof setInterval>[] = [];

  constructor(root: HTMLElement) {
    this.root = root;
  }

  render(): void {
    this.animationIntervals.forEach(clearInterval);
    this.animationIntervals = [];
    this.root.innerHTML = `
      <div class="landing">

        <!-- Header Hero Section -->
        <section class="landing-hero">
          <nav class="landing-nav">
            <a href="/" class="landing-brand">Claude wiki</a>
            <a href="/docs" class="landing-nav-docs">Docs</a>
          </nav>
          <div class="landing-hero-copy fade-in-section">
            <p class="landing-eyebrow">우아한테크코스 클로드 코드 원정대</p>
            <h1 class="landing-headline">Claude Code를 직접 써봐야 알 수 있는 것들</h1>
            <p class="landing-hero-body">원정대 멤버들이 Claude Code를 실제로 사용하며 발견한 팁, 패턴, 인사이트를 나무위키 스타일로 정리했습니다. 문서는 Claude Code가 직접 작성하고 구조화합니다.</p>
            <div class="landing-cta-row">
              <a href="/docs" class="landing-cta-primary">문서 읽기 시작</a>
            </div>
          </div>
        </section>

        <!-- Intro Section -->
        <section class="landing-intro fade-in-section">
          <div class="landing-intro-inner">
            <p class="landing-intro-label">SERVICE INTRO</p>
            <h2 class="landing-intro-headline">Claude Wiki를 더 빠르고 또렷하게 시작하는 방법</h2>
            <p class="landing-intro-body">Claude Wiki는 흩어진 문서를 한곳에 정리하고, 필요한 맥락을 바로 이어서 탐색할 수 있도록 설계된 온보딩 허브입니다. 처음 들어온 팀원도 구조를 따라가며 빠르게 이해하고, 검색으로 원하는 내용을 즉시 찾고, 정리된 문서를 그대로 공유하며 같은 출발선에 설 수 있습니다.</p>
            <div class="landing-chips">
              <span class="landing-chip">구조화된 탐색</span>
              <span class="landing-chip">빠른 검색</span>
              <span class="landing-chip">공유 가능한 문서</span>
            </div>
          </div>
        </section>

        <!-- Features Top -->
        <section class="landing-features-top">
          <hr class="landing-divider" />

          <div class="landing-features-heading fade-in-section">
            <p class="landing-features-eyebrow">핵심 기능</p>
            <h2 class="landing-features-headline">찾는 흐름이 끊기지 않도록, 문서 탐색을 더 단정하게 설계했습니다.</h2>
            <p class="landing-features-summary">사이드바에서 길을 잃지 않고, 문서 안에서는 필요한 위치로 바로 움직이며, 검색으로 모든 기록을 한 번에 훑을 수 있습니다.</p>
          </div>

          <div class="landing-feature-cards">

            <!-- Card 1: 계층형 탐색 -->
            <div class="landing-feature-card fade-in-section" data-delay="1">
              <p class="landing-card-meta">01&nbsp;&nbsp;계층형 탐색</p>
              <h3 class="landing-card-title">계층형 사이드바 네비게이션</h3>
              <p class="landing-card-body">문서와 하위 문서를 깊이 있게 정리해도 현재 위치와 구조를 한눈에 파악할 수 있습니다.</p>
              <div class="landing-card-mock">
                <div class="landing-mock-side-nav">
                  <span class="landing-mock-nav-item" data-nav-state="muted">워크스페이스</span>
                  <span class="landing-mock-nav-item" data-nav-state="active">제품 문서</span>
                  <span class="landing-mock-nav-item" data-nav-state="default">설치 가이드</span>
                  <span class="landing-mock-nav-item" data-nav-state="default">운영 정책</span>
                </div>
                <div class="landing-mock-article">
                  <span class="mock-article-breadcrumb" style="font-size:0.6875rem;font-weight:500;color:var(--color-text-muted)">제품 문서 / 설치 가이드</span>
                  <span class="mock-article-title" style="font-size:1rem;font-weight:600;color:var(--color-primary)">설치 전 체크리스트</span>
                  <hr class="landing-mock-divider" />
                  <p class="mock-article-body" style="font-size:0.75rem;font-weight:400;color:var(--color-text-secondary);line-height:1.5">권한, 환경 변수, 협업 규칙을 한 번에 정리합니다.</p>
                </div>
              </div>
            </div>

            <!-- Card 2: 문서 이동 -->
            <div class="landing-feature-card fade-in-section" data-delay="2">
              <p class="landing-card-meta">02&nbsp;&nbsp;문서 이동</p>
              <h3 class="landing-card-title">문서 안 목차로 바로 점프</h3>
              <p class="landing-card-body">긴 문서도 읽는 흐름을 유지한 채 섹션 단위로 이동해 필요한 맥락을 빠르게 다시 찾습니다.</p>
              <div class="landing-card-mock">
                <div class="landing-mock-article">
                  <span style="font-size:1rem;font-weight:600;color:var(--color-primary)">문서 편집 가이드</span>
                  <p style="font-size:0.75rem;font-weight:400;color:var(--color-text-secondary);line-height:1.5">목차를 누르면 필요한 섹션으로 곧바로 이동합니다.</p>
                  <hr class="landing-mock-divider" />
                </div>
                <div class="landing-mock-toc">
                  <span class="mock-toc-item" data-toc-state="default">개요</span>
                  <span class="mock-toc-item" data-toc-state="active">편집 흐름</span>
                  <span class="mock-toc-item" data-toc-state="default">권한 관리</span>
                </div>
              </div>
            </div>

            <!-- Card 3: 빠른 회수 -->
            <div class="landing-feature-card fade-in-section" data-delay="3">
              <p class="landing-card-meta">03&nbsp;&nbsp;빠른 회수</p>
              <h3 class="landing-card-title">전체 텍스트 검색</h3>
              <p class="landing-card-body">제목과 본문을 함께 훑는 검색으로 흩어진 지식도 키워드 하나로 다시 모아볼 수 있습니다.</p>
              <div class="landing-card-mock landing-card-mock--col">
                <div class="landing-mock-search-bar">
                  <span class="mock-search-text" style="font-size:0.75rem;font-weight:400;color:var(--color-text-secondary)">'권한 정책'</span>
                  <span style="font-size:0.75rem;font-weight:600;color:var(--color-focus)">/</span>
                </div>
                <div class="landing-mock-results">
                  <span class="mock-result-title" style="font-size:0.8125rem;font-weight:600;color:var(--color-primary)">권한 정책 업데이트</span>
                  <p style="font-size:0.75rem;font-weight:400;color:var(--color-text-secondary);line-height:1.5">역할별 접근 범위와 예외 처리 규칙을 함께 찾았습니다.</p>
                  <hr class="landing-mock-divider" />
                  <span class="mock-result-tag" style="font-size:0.6875rem;font-weight:400;color:var(--color-focus)">운영 정책 / 보안 / 권한</span>
                </div>
              </div>
            </div>

          </div>
        </section>

        <!-- Features Bottom & CTA -->
        <section class="landing-features-bottom">

          <div class="landing-bottom-blocks">

            <!-- Feature 04: 코드 블록 -->
            <div class="landing-feature-block fade-in-section">
              <div class="landing-feature-block-text">
                <span class="landing-feature-block-index">04</span>
                <h3 class="landing-feature-block-title">개발자 친화적 코드 블록</h3>
                <p class="landing-feature-block-body">긴 기술 문서에서도 코드 예시는 읽기 쉽게 정리됩니다. 언어별 구문 강조와 충분한 여백으로, 필요한 구현 포인트를 빠르게 확인할 수 있습니다.</p>
              </div>
              <div class="landing-feature-block-visual">
                <span class="landing-code-label">JavaScript</span>
                <span class="landing-code-line" style="color:var(--color-primary)">const page = await wiki.find('getting-started');</span>
                <span class="landing-code-line" style="color:var(--color-accent)">page.sections.open('installation');</span>
                <span class="landing-code-line" style="color:var(--color-text-secondary)">return page.share('/docs/getting-started');</span>
              </div>
            </div>

            <hr class="landing-divider" style="margin:0" />

            <!-- Feature 05: 공유 링크 -->
            <div class="landing-feature-block fade-in-section">
              <div class="landing-feature-block-text">
                <span class="landing-feature-block-index">05</span>
                <h3 class="landing-feature-block-title">예측 가능한 공유 링크</h3>
                <p class="landing-feature-block-body">문서 주소는 slug 기반으로 정리되어 있어 링크를 읽는 순간 내용이 떠오릅니다. 팀원에게 전달하거나 다시 방문할 때도 경로를 쉽게 기억할 수 있습니다.</p>
              </div>
              <div class="landing-feature-block-visual">
                <div>
                  <div class="landing-url-badge">
                    <span class="landing-url-badge-text">Shareable URL</span>
                  </div>
                </div>
                <span class="landing-url-line">/docs/getting-started</span>
                <p class="landing-url-desc">누구나 이해할 수 있는 경로로 특정 문서를 바로 공유할 수 있습니다.</p>
              </div>
            </div>

          </div>

          <!-- Final CTA -->
          <div class="landing-final-cta fade-in-section">
            <h2 class="landing-cta-title">지금 바로 시작해보세요</h2>
            <p class="landing-cta-body">Claude wiki에서 필요한 문서를 빠르게 찾고, 구조적으로 탐색하고, 바로 공유해보세요.</p>
            <button class="landing-cta-button" onclick="location.href='/docs'">위키 시작하기</button>
          </div>

          <!-- Landing Footer -->
          <footer class="landing-footer">
            <span class="landing-footer-copy">© Claude wiki</span>
            <div class="landing-footer-links">
              <a href="/docs" class="landing-footer-link">문서 보기</a>
              <a href="https://github.com" class="landing-footer-link" target="_blank" rel="noopener noreferrer">GitHub</a>
            </div>
          </footer>

        </section>

      </div>
    `;
    this.initAnimations();
    this.initMockAnimations();
  }

  private initAnimations(): void {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 },
    );

    this.root.querySelectorAll<HTMLElement>('.fade-in-section').forEach((el) => {
      observer.observe(el);
    });
  }

  private initMockAnimations(): void {
    const cards = this.root.querySelectorAll<HTMLElement>('.landing-feature-card');

    const startOnVisible = (el: HTMLElement, cb: () => ReturnType<typeof setInterval>) => {
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              this.animationIntervals.push(cb());
              obs.unobserve(el);
            }
          });
        },
        { threshold: 0.4 },
      );
      obs.observe(el);
    };

    if (cards[0]) this.initNavAnimation(cards[0], startOnVisible);
    if (cards[1]) this.initTocAnimation(cards[1], startOnVisible);
    if (cards[2]) this.initSearchAnimation(cards[2], startOnVisible);
  }

  private initNavAnimation(
    card: HTMLElement,
    startOnVisible: (el: HTMLElement, cb: () => ReturnType<typeof setInterval>) => void,
  ): void {
    const navItems = card.querySelectorAll<HTMLElement>('.landing-mock-nav-item');
    const article = card.querySelector<HTMLElement>('.landing-mock-article');
    const breadcrumb = card.querySelector<HTMLElement>('.mock-article-breadcrumb');
    const docTitle = card.querySelector<HTMLElement>('.mock-article-title');
    const docBody = card.querySelector<HTMLElement>('.mock-article-body');

    if (!navItems.length || !article || !breadcrumb || !docTitle || !docBody) return;

    const navData = [
      {
        breadcrumb: '워크스페이스 / 개요',
        title: '워크스페이스 개요',
        body: '팀 전체 문서를 한 공간에서 탐색합니다.',
      },
      {
        breadcrumb: '제품 문서 / 설치 가이드',
        title: '설치 전 체크리스트',
        body: '권한, 환경 변수, 협업 규칙을 한 번에 정리합니다.',
      },
      {
        breadcrumb: '제품 문서 / 설치 가이드',
        title: '환경 설정 가이드',
        body: '단계별 설치 절차와 설정 방법을 안내합니다.',
      },
      {
        breadcrumb: '제품 문서 / 운영 정책',
        title: '운영 정책 개요',
        body: '서비스 운영에 필요한 정책과 규정을 정리합니다.',
      },
    ];

    let current = 1;

    const activate = (index: number) => {
      const target = navItems[index];
      target.classList.add('is-clicking');
      setTimeout(() => {
        target.classList.remove('is-clicking');
        navItems.forEach((item, i) => {
          item.setAttribute(
            'data-nav-state',
            i === index ? 'active' : i === 0 ? 'muted' : 'default',
          );
        });
      }, 180);

      setTimeout(() => {
        article.classList.add('is-fading');
        setTimeout(() => {
          const d = navData[index];
          breadcrumb.textContent = d.breadcrumb;
          docTitle.textContent = d.title;
          docBody.textContent = d.body;
          article.classList.remove('is-fading');
        }, 200);
      }, 100);

      current = index;
    };

    startOnVisible(card, () => setInterval(() => activate((current + 1) % navItems.length), 2200));
  }

  private initTocAnimation(
    card: HTMLElement,
    startOnVisible: (el: HTMLElement, cb: () => ReturnType<typeof setInterval>) => void,
  ): void {
    const tocItems = card.querySelectorAll<HTMLElement>('.mock-toc-item');
    if (!tocItems.length) return;

    let current = 1;

    const activate = (index: number) => {
      tocItems[index].classList.add('is-clicking');
      setTimeout(() => {
        tocItems[index].classList.remove('is-clicking');
        tocItems.forEach((item, i) => {
          item.setAttribute('data-toc-state', i === index ? 'active' : 'default');
        });
      }, 180);
      current = index;
    };

    startOnVisible(card, () => setInterval(() => activate((current + 1) % tocItems.length), 1800));
  }

  private initSearchAnimation(
    card: HTMLElement,
    startOnVisible: (el: HTMLElement, cb: () => ReturnType<typeof setInterval>) => void,
  ): void {
    const searchText = card.querySelector<HTMLElement>('.mock-search-text');
    const resultTitle = card.querySelector<HTMLElement>('.mock-result-title');
    const resultTag = card.querySelector<HTMLElement>('.mock-result-tag');
    const results = card.querySelector<HTMLElement>('.landing-mock-results');

    if (!searchText || !resultTitle || !resultTag || !results) return;

    const searchData = [
      { query: '권한 정책', title: '권한 정책 업데이트', tag: '운영 정책 / 보안 / 권한' },
      { query: 'Claude Code', title: 'Claude Code 훅 설정', tag: '개발 / 자동화 / 훅' },
      { query: '문서 편집', title: '문서 편집 가이드', tag: '가이드 / 에디터 / 마크다운' },
    ];

    let dataIndex = 0;

    const runCycle = () => {
      dataIndex = (dataIndex + 1) % searchData.length;
      const d = searchData[dataIndex];

      searchText.textContent = '';
      let charIndex = 0;
      const typeInterval = setInterval(() => {
        charIndex++;
        searchText.textContent = `'${d.query.slice(0, charIndex)}'`;
        if (charIndex >= d.query.length) {
          clearInterval(typeInterval);
          setTimeout(() => {
            results.classList.add('is-fading');
            setTimeout(() => {
              resultTitle.textContent = d.title;
              resultTag.textContent = d.tag;
              results.classList.remove('is-fading');
            }, 250);
          }, 300);
        }
      }, 80);
    };

    startOnVisible(card, () => setInterval(runCycle, 3200));
  }
}
