# Claude Wiki

> 우아한테크코스 클로드 코드 원정대가 Claude Code를 직접 사용하며 쌓은 인사이트와 블로그 포스트를 모아 만드는 나무위키 스타일의 지식 베이스.
> **Claude Code가 콘텐츠 작성, 구조화, 연결을 직접 수행하는 것이 핵심 컨셉.**

---

## 핵심 기능

| 기능      | 설명                                     |
| --------- | ---------------------------------------- |
| 문서 탐색 | 사이드바 트리 기반 계층적 문서 탐색      |
| 문서 상세 | 마크다운 렌더링 + TOC + 코드 하이라이팅  |
| 블로그    | 멤버 블로그 카드 목록 및 상세            |
| 검색      | 서버사이드 텍스트 검색 + 본문 하이라이트 |
| 어드민    | 마크다운 에디터로 문서 작성/수정/관리    |

---

## 기술 스택

| 항목              | 버전   | 비고                              |
| ----------------- | ------ | --------------------------------- |
| TypeScript        | 5.x    | `any` 사용 금지, 타입 추론 최대화 |
| Tailwind CSS      | 4.x    | `@theme` 기반 디자인 토큰         |
| Vite              | 6.x    | 번들러                            |
| Vitest            | 2.x    | 유닛 / 통합 테스트                |
| Cypress           | 13.x   | E2E 테스트                        |
| Bun               | latest | 패키지 매니저                     |
| ESLint + Prettier | —      | 코드 품질                         |
| Husky             | 9.x    | git 훅 자동화                     |

---

## 팀원

| <img src="https://github.com/geongyu09.png" width="60" /><br>도넛 | <img src="https://github.com/bel1c10ud.png" width="60" /><br>클라우디 | <img src="https://github.com/iftype.png" width="60" /><br>콘티 | <img src="https://github.com/bigcloud07.png" width="60" /><br>루멘 | <img src="https://github.com/vlmbuyd.png" width="60" /><br>유월 | <img src="https://github.com/lee-eojin.png" width="60" /><br>레스 |
| :---------------------------------------------------------------: | :-------------------------------------------------------------------: | :------------------------------------------------------------: | :----------------------------------------------------------------: | :-------------------------------------------------------------: | :---------------------------------------------------------------: |
|            [@geongyu09](https://github.com/geongyu09)             |              [@bel1c10ud](https://github.com/bel1c10ud)               |              [@iftype](https://github.com/iftype)              |            [@bigcloud07](https://github.com/bigcloud07)            |             [@vlmbuyd](https://github.com/vlmbuyd)              |            [@lee-eojin](https://github.com/lee-eojin)             |

---

## 시작하기

```bash
# 패키지 설치
bun install

# 개발 서버 실행
bun dev

# 빌드
bun build

# 테스트
bun test
bun test:e2e
```

---

## 프로젝트 구조

### 전체 디렉토리

```
claude-wiki-fe/
├── src/                    # 소스 코드
├── .claude/                # Claude Code 설정 (AI 워크플로우)
├── .husky/                 # git 훅 (pre-commit, commit-msg)
├── context/                # 프로젝트 맥락 문서
├── CLAUDE.md               # Claude에게 주는 프로젝트 지시서
├── design.md               # 디자인 시스템 (Notion 스타일)
└── index.html
```

### src 아키텍처

```
src/
├── main.ts                             # 진입점 — Layout 마운트 + 라우터 초기화
├── vite-env.d.ts                       # Vite 클라이언트 타입 선언
│
├── router/
│   └── router.ts                       # History API SPA 라우터
│                                       #   ├─ 동적 파라미터 (:slug)
│                                       #   ├─ <a> 클릭 인터셉트
│                                       #   └─ popstate (뒤로/앞으로)
│
├── pages/                              # [View] 라우트 진입점 (1 route : 1 file)
│   ├── home/HomePage.ts                #   /
│   ├── docs/
│   │   ├── DocsListPage.ts             #   /docs
│   │   └── DocsDetailPage.ts           #   /docs/:slug
│   ├── blog/
│   │   ├── BlogListPage.ts             #   /blog
│   │   └── BlogDetailPage.ts           #   /blog/:slug
│   └── admin/
│       ├── AdminLoginPage.ts           #   /admin
│       ├── AdminDashboardPage.ts       #   /admin/dashboard
│       └── AdminEditorPage.ts          #   /admin/editor/:slug?
│
├── domains/                            # 비즈니스 로직 (MVC)
│   ├── docs/
│   │   ├── list/
│   │   │   ├── controller/             # [C] 이벤트 처리, Model↔View 조율
│   │   │   ├── model/                  # [M] API 호출, 데이터 가공
│   │   │   ├── view/                   # [V] 세그먼트 전용 DOM 컴포넌트
│   │   │   └── types/                  # 세그먼트 전용 타입
│   │   ├── detail/                     # (동일 구조)
│   │   └── types/                      # 도메인 공용 타입
│   ├── blog/                           # (동일 구조)
│   ├── admin/
│   │   ├── auth/                       # 로그인 인증
│   │   ├── dashboard/                  # 문서 목록 관리
│   │   └── editor/                     # 마크다운 에디터
│   └── search/
│       ├── modal/                      # 검색 모달
│       └── results/                    # 검색 결과
│
├── shared/                             # 도메인 무관 공용 모듈
│   ├── components/
│   │   ├── Gnb.ts                      # 전역 네비게이션 바 (모든 페이지 공유)
│   │   └── Footer.ts                   # 전역 푸터
│   ├── layouts/
│   │   └── Layout.ts                   # GNB + Footer 최초 1회 마운트
│   ├── api/                            # fetch 유틸 (동시성 처리 포함)
│   ├── types/                          # 공용 타입
│   └── utils/                          # 공용 유틸
│
└── styles/
    ├── globals.css                     # Tailwind @theme 토큰 + 전역 리셋
    └── fonts.css                       # Pretendard Variable CDN
```

### MVC 흐름

```
라우터가 URL 매칭
      ↓
Page.render()          [View]   스켈레톤 UI 출력
      ↓
Controller.init()      [C]      Model 호출
      ↓
Model.fetchData()      [M]      API 요청
      ↓
Controller → View      [C→V]    데이터 전달
      ↓
View.render(data)      [View]   실제 데이터로 DOM 업데이트
      ↓
사용자 이벤트 → Controller로 위임
```

---

## Claude Code 구조

Claude Code가 이 프로젝트의 개발 파트너로 참여합니다.

```
.claude/
├── CLAUDE.md (루트)            # 프로젝트 전체 지시서 — Claude가 최우선 참조
│
├── rules/                      # Claude가 반드시 따르는 규칙
│   ├── conventions.md          # 코드 컨벤션 (네이밍, 타입, CSS 등)
│   └── git-flow.md             # 커밋 메시지 형식, PR 규칙
│
├── hooks/                      # Claude 행동 자동 제어 (settings.local.json에 등록)
│   ├── commit-msg-validate.sh  # [PreToolUse]  커밋 메시지 컨벤션 검증
│   ├── no-any-check.sh         # [PostToolUse] any 타입 사용 차단
│   └── file-naming-check.sh   # [PostToolUse] 파일/폴더명 컨벤션 검증
│
├── skills/                     # 재사용 가능한 작업 템플릿
│   ├── commit.md               # 커밋 생성 플로우
│   ├── pr.md                   # PR 생성 플로우
│   └── issues.md               # 이슈 생성 플로우
│
└── agent/
    └── reviewer.md             # 코드 리뷰 전용 에이전트 설정
```

### Claude 자동화 훅 동작 방식

```
Claude가 git commit 실행
      ↓
[PreToolUse] commit-msg-validate.sh
      → 형식 위반 시 즉시 차단 (exit 2)

Claude가 .ts 파일 Write / Edit
      ↓
[PostToolUse] no-any-check.sh      → any 타입 감지 시 차단
[PostToolUse] file-naming-check.sh → 네이밍 위반 시 차단
```

---

## 개발 규칙 요약

### 커밋 메시지

```
<type>(<scope>): <내용>

feat(docs): 문서 목록 페이지 구현
fix(router): popstate 이벤트 누락 수정
```

| type       | 용도      |
| ---------- | --------- |
| `feat`     | 기능 구현 |
| `fix`      | 버그 수정 |
| `docs`     | 문서 작업 |
| `style`    | 포맷팅    |
| `refactor` | 리팩토링  |
| `setting`  | 환경 설정 |
| `chore`    | 기타      |

### 코드 컨벤션 핵심

- `any` 사용 **절대 금지** (Claude 훅이 자동 차단)
- 모든 import는 `@/` 절대 경로 사용
- CSS 단위는 `rem` (1rem = 16px)
- 색상 하드코딩 금지 — CSS 변수 사용
- 이벤트 리스너 등록 시 반드시 cleanup 처리

---

## 관련 문서

- [디자인 시스템](./design.md)
- [유저 시나리오](./context/scenario.md)
- [코드 컨벤션](./.claude/rules/conventions.md)
- [Git 규칙](./.claude/rules/git-flow.md)
