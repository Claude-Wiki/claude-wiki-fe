# Findings — #24 블로그 피드 페이지

## 현재 코드 구조 스냅샷

### 파일 상태

- `src/pages/blog/BlogListPage.ts` — stub (`<h1>Blog</h1>` 만)
- `src/domains/blog/list/model/blogListModel.ts` — 빈 파일
- `src/domains/blog/list/controller/blogListController.ts` — 빈 파일
- `src/domains/blog/types/blog.types.ts` — 빈 파일
- `src/shared/lib/firebase/client.ts` — **현재 브랜치에 없음** (PR #26 에만 존재, `dev` 미반영)

### 기존 패턴 (참고)

- `src/pages/home/HomePage.ts` + `HomePage.css` — 페이지 구성 패턴: 클래스 기반, `render()` 안에서 innerHTML 템플릿 + CSS 파일 상단 import.
- `src/router/router.ts` — `navigate(path)`, `:param` 파라미터 추출, 앵커 클릭 인터셉트. SPA 라우터 자체는 완성.
- `src/main.ts` — `BlogListPage` 는 이미 `/blog` 로 라우터에 등록됨 (빈 stub 이지만 라우팅은 뚫려 있음).
- `src/styles/globals.css` — 디자인 토큰 풀셋 (CSS 변수 + Tailwind `@theme`).

### 디자인 시스템 토큰 (globals.css 기준, 블로그 피드에 쓸 만한 것)

- Color: `--color-accent` (#0075de), `--color-bg-warm` (#f6f5f4), `--color-text-muted` (#a39e98), `--color-text-secondary` (#615d59), `--color-border` (rgba(0,0,0,0.1))
- Radius: `--radius-standard` (0.5rem), `--radius-pill` (9999px), `--radius-comfortable` (0.75rem)
- Shadow: `--shadow-card`
- Font size: `--font-size-card-title` (1.375rem), `--font-size-caption` (0.875rem), `--font-size-badge` (0.75rem), `--font-size-subheading` (1.625rem)
- Max content width: `--max-content-width` (75rem)
- Whisper border: `var(--border-whisper)` = `1px solid rgba(0,0,0,0.1)`
- Badge: `--color-badge-bg` (#f2f9ff), `--color-badge-text` (#097fe8)

## 카테고리 상수 (이슈 #24 본문 기준)

`전체`, `페어 프로그래밍`, `Claude Code`, `프롬프트 엔지니어링`, `코드 리뷰`, `자동화`, `CLAUDE.md`, `트러블슈팅`

## Firestore 쿼리 패턴 (api.md)

- `posts` 컬렉션, `where('published', '==', true)` + `orderBy('createdAt', 'desc')` + `limit(PAGE_SIZE)`.
- 카테고리 필터: `where('category', '==', selectedCategory)` 추가 (전체 선택 시 생략).
- 커서 페이지네이션: `startAfter(lastDoc)` — `QueryDocumentSnapshot` 을 커서로 보관.
- Security Rules: 공개 글 읽기는 비로그인 허용.

> 주의: `api.md` 의 import 경로는 `@/lib/firebase/client` 로 표기되나 실제 코드베이스는 `@/shared/lib/firebase/client`. 구현 시 실제 경로 사용.

## 의존성 이슈

현재 브랜치(`feat/#24-implement-blog-feed-page`) 는 `dev` 기반이라 `firebase` 패키지도, `src/shared/lib/firebase/client.ts` 도 없다. PR #26 (`setting/#25-setup-firebase-client-sdk`) 가 이걸 추가하지만 아직 머지 전. **결정 사항 #1 참조**.

## 관련 PR / 이슈

- PR #26 (OPEN): Firebase Client SDK 셋업 — `client.ts`, `.env.example`, `vite-env.d.ts` 추가
- PR #18 (OPEN): Firestore CRUD 모델 레이어 & `postRepository` — `postType` 구분자 포함 · `src/shared/types/post.types.ts` 도입
- 이슈 #24: 블로그 피드 페이지 스펙

## 디자인 노드 스펙 (pencil MCP 추출 완료)

> `Hhk80` 은 오타 — 실제 ID 는 `Hhk8O` (content1 섹션, EO2II 내부)

### 전체 레이아웃 (3T3tQ: Blog Page, 1440×900)

```
[GNB]       height 56px, padding 0 32px — 기존 Gnb.ts 재사용
[Main]      fill, justify-content: center (수평 중앙 정렬)
  [Content] width 640px, layout vertical, padding 32px top/bottom, gap 28px
    ├─ Chip Filter Section (ZckLS)  gap 24px (내부)
    └─ Blog Feed (kJc6J)            gap 28px (카드 간격)
[Footer]    height 60px — 기존 Footer.ts 재사용
```

### 헤더 섹션 (ZckLS 내 headerGroup)

- 제목: Inter 28px/700, `#000000F2`, "블로그"
- 부제: Inter 14px/normal, `#615D59FF`, "클로드 코드 원정대의 인사이트와 경험을 공유합니다"
- 제목↔부제 gap: 6px

### 칩 필터 (SzkfX)

- 컨테이너: height 70px, 두 줄 wrap (1행 y=0, 2행 y=39)
- 각 칩 padding: 6px 14px, radius: 9999px
- **활성 칩**: fill `#0075DE`, text `#FFFFFF`, 13px/600
- **비활성 칩**: fill `#F6F5F4`, border `1px solid rgba(0,0,0,0.1)`, text `#615D59`, 13px/500
- 칩 목록: 전체(활성), 페어 프로그래밍, Claude Code, 프롬프트 엔지니어링, 코드 리뷰, 자동화, CLAUDE.md, 트러블슈팅
- 칩 섹션 하단: 구분선 `1px solid rgba(0,0,0,0.1)`

### 카드 (EO2II: Card 1)

- layout: vertical, gap 12px, padding bottom 16px
- 썸네일: width 100%, height 180px, radius 8px, clip (object-fit cover)
- 컨텐츠 영역 (Hhk8O): padding 0 16px, gap 8px
  - 카테고리 라벨: Inter 12px/700, `#0075DE`
  - 제목: Inter 18px/700, `#000000F2`
  - 메타(작성자 · 날짜): Inter 13px/normal, `#A39E98`
- 카드 간격: 28px

### 결정 #4 확정

**페이지 사이즈 = 10** (단일 컬럼, 그리드 정렬 불필요)
