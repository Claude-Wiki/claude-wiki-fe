# Task Plan — #24 블로그 피드 페이지 구현

## 목표

`/blog` 경로에서 Firestore `posts` 컬렉션의 공개(`published === true`) 글을 `createdAt desc` 순으로 카드 목록 렌더링. 카테고리 칩 필터·무한스크롤·카드 클릭 시 `/blog/:slug` 이동 포함. 디자인은 `claude-wiki.pen` 노드 `3T3tQ` 기준.

## 진행 규칙

- 각 Phase 시작 전 본 문서를 다시 읽는다.
- Write/Edit 후 `progress.md` 에 타임스탬프·요약 기록.
- **Phase 를 닫을 때마다 `/commit` 스킬을 호출해 해당 Phase 스코프의 커밋·푸시를 수행**한다.
- 같은 접근 3회 실패 시 `findings.md` 에 원인 기록 후 접근 방식 변경.

## 현재 Phase

**Phase 2 — UI 마크업 & 스타일** (대기 중)

---

## Phase 목록

### Phase 0 — 탐색 & 의사결정 ✅

- [x] pencil MCP 로 디자인 노드(`3T3tQ`, `ngcbD`, `ZckLS`, `EO2II`, `Hhk8O`) 치수·색·간격 추출 → `findings.md`
- [x] 결정 사항 5개 확정
- [x] 필요한 추가 디자인 노드 ID 확인
- [x] **커밋 완료** `e6868bf`

### Phase 1 — 데이터 레이어 (model) ✅

- [x] `src/domains/blog/types/blog.types.ts` — `BlogPost`, `BlogCategory`, `BlogCursor`, `BlogListQuery` 타입
- [x] `src/domains/blog/list/model/blogListModel.ts` — `fetchPublishedBlogPosts({ cursor, category })` (isLoading 가드 포함)
- [x] `src/domains/blog/list/blogCategory.const.ts` — 고정 카테고리 상수
- [x] **`/commit` — `feat(blog): 블로그 피드 데이터 레이어 추가`**

### Phase 2 — UI 마크업 & 스타일 (view)

- [ ] `src/pages/blog/BlogListPage.ts` — 헤더/부제/칩/리스트/sentinel 마크업
- [ ] `src/pages/blog/BlogListPage.css` — 디자인 토큰(globals.css 변수) 기반 스타일, rem 단위
- [ ] 카드 렌더러 구조화 (함수 분리 or `BlogCard` 유틸)
- [ ] **`/commit` — `feat(blog): 블로그 피드 페이지 마크업·스타일 구현`**

### Phase 3 — 컨트롤러 & 상태 처리

- [ ] `src/domains/blog/list/controller/blogListController.ts` — 로딩/빈/에러/정상 상태 전환
- [ ] 스켈레톤 카드 3–5개 렌더러
- [ ] 빈 상태·에러(재시도) UI
- [ ] 카테고리 선택 → 커서 리셋 후 재조회
- [ ] **`/commit` — `feat(blog): 블로그 피드 상태 처리 및 카테고리 필터 구현`**

### Phase 4 — 무한스크롤

- [ ] IntersectionObserver 로 리스트 하단 sentinel 관찰
- [ ] 다음 페이지 로드 + `isLoading` 가드 (결정 사항 #3 결과)
- [ ] `nextCursor === null` 시 observer `disconnect`
- [ ] 라우팅 전환·언마운트 시 cleanup (메모리 누수 방지)
- [ ] **`/commit` — `feat(blog): 블로그 피드 무한스크롤 구현`**

### Phase 5 — 라우팅 연결 & 검증

- [ ] 카드 클릭 시 `/blog/:slug` 이동 (Router.navigate)
- [ ] `bun run dev` 로 로컬 실행 확인 (에뮬레이터 or 실제 Firebase)
- [ ] `npx tsc --noEmit` 통과
- [ ] `bun run lint` 통과
- [ ] 디자인 매칭 육안 검증
- [ ] **`/commit` — `fix(blog): 상세 이동 라우팅 및 검증 결과 반영`** (수정 사항이 있을 때만)

### Phase 6 — PR 생성

- [ ] `/pr` 스킬로 PR 생성 (base: `dev`, close #24)

---

## 결정 사항

각 결정은 Phase 0 종료 전에 사용자 승인을 받아 확정한다.

| #   | 결정 포인트            | 옵션 | 선택                                        | 근거                          |
| --- | ---------------------- | ---- | ------------------------------------------- | ----------------------------- |
| 1   | Firebase client 의존성 | —    | **C — `setting/#25` 병합 완료** (`958723f`) | 파일 충돌 없이 클린 병합      |
| 2   | 데이터 접근 계층       | —    | **A — 도메인 모델에 직접 구현**             | #18 독립, 충돌 없음           |
| 3   | 동시성 방지 방식       | —    | **A — `isLoading` 가드**                    | 단순·충분                     |
| 4   | 페이지 사이즈          | —    | **A — 10**                                  | 단일 컬럼, 그리드 정렬 불필요 |
| 5   | 폰트 표기 불일치       | —    | **globals.css (Pretendard)**                | 실제 코드 기준                |

---

## 에러 로그

_(아직 없음)_
