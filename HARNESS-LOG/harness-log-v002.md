# harness-log-v002

> 생성일: 2026-04-19 00:00
> 커밋 대상: .claude/, CLAUDE.md

## 1. 변경 내용 요약

- `CLAUDE.md`: 파일명 `claude.md` → `CLAUDE.md`로 대소문자 변경 (git rename). 내용은 동일하며, 파일명 케이싱을 프로젝트 컨벤션(대문자)에 맞게 정규화한 것으로 추정.

## 2. .claude 디렉토리 구조

```
.claude/
├── agent/
│   └── reviewer.md
├── context/
│   ├── api.md
│   ├── architecture.md
│   ├── connect.md
│   ├── design.md
│   └── scenario.md
├── hooks/
│   ├── README.md
│   ├── commit-msg-validate.sh
│   ├── file-naming-check.sh
│   └── no-any-check.sh
├── rules/
│   ├── constraints.md
│   ├── conventions.md
│   └── git-flow.md
├── settings.json
├── settings.local.json
└── skills/
    ├── commit/
    │   └── SKILL.md
    ├── create-issue/
    │   └── SKILL.md
    ├── harness-log/
    │   └── SKILL.md
    ├── issues.md
    └── pr/
        └── SKILL.md
[A] CLAUDE.md
```

## 3. Raw Diff

```diff
diff --git a/CLAUDE.md b/CLAUDE.md
new file mode 100644
index 0000000..73cc0bf
--- /dev/null
+++ b/CLAUDE.md
@@ -0,0 +1,80 @@
+# Claude Wiki — 클로드 코드 원정대
+
+## 프로젝트 개요
+
+우아한테크코스 클로드 코드 원정대 멤버들이 Claude Code를 직접 사용하며
+쌓은 인사이트와 블로그 포스트를 모아 만드는 나무위키 스타일의 지식 베이스.
+Claude Code가 콘텐츠 작성, 구조화, 연결을 직접 수행하는 것이 핵심 컨셉.
+
+## 핵심 기능
+
+- CLAUDE 사용 경험 기반 문서 작성
+- 카테고리(태그)별 문서 탐색
+- 검색 기능
+
+## 아키텍쳐
+
+MVC 패턴 적극 도입
+
+## 디렉토리 구조
+
+```
+claude-wiki-fe/
+├── src/
+├── .claude/
+│   ├── agent/                  # 멀티 에이전트 구성 관련
+│   │   └── reviewer.md
+│   ├── context/                # 프로젝트 맥락
+│   │   ├── architecture.md     # 아키텍처
+│   │   ├── api.md              # API 명세 (Firestore 컬렉션/쿼리)
+│   │   ├── connect.md          # Firebase 연결 가이드
+│   │   ├── design.md           # 디자인 시스템 (Notion 스타일)
+│   │   └── scenario.md         # 유저 시나리오
+│   ├── hooks/                  # 작업 전후 자동 실행 스크립트
+│   ├── rules/                  # Claude가 따라야 할 도메인 규칙
+│   │   ├── constraints.md
+│   │   ├── git-flow.md
+│   │   └── conventions.md
+│   ├── skills/                 # 재사용 가능한 작업 단위
+│   │   ├── commit/SKILL.md     # commit 플로우
+│   │   ├── pr/SKILL.md         # pr 플로우
+│   │   └── issues.md           # issue 플로우
+│   └── settings.json           # 권한 및 동작 설정
+├── .husky/                     # Git 훅 (Husky 관리)
+├── .gitignore
+├── CLAUDE.md
+├── HARNESS-LOG/                # 하네스 실험 기록 (절대 임의 수정 금지)
+│   └── harness-log-vXXX.md
+└── README.md
+```
+
+## 기술 스택(버전 명시)
+
+- **언어**: JavaScript, TypeScript (5.x)
+- **스타일링**: Tailwind CSS (4.x)
+- **테스트**: Vitest (유닛/통합), Cypress (E2E)
+- **패키지 매니저**: Bun
+- **포맷팅 & 린팅**: Prettier, ESLint
+- **Git 훅 관리**: Husky
+
+## 빌드 명령어
+
+(프로젝트 시작 시 작성)
+
+## 작업 흐름
+
+(프로젝트 시작 시 작성)
+
+## 지시 참고 사항
+
+작업 전 `.claude/context/` 안의 관련 파일을 확인해라.
+
+| 파일              | 역할                     |
+| ----------------- | ------------------------ |
+| `architecture.md` | 전체 구조, 패턴          |
+| `api.md`          | Firestore 컬렉션/쿼리    |
+| `connect.md`      | Firebase 연결            |
+| `design.md`       | 디자인 시스템, UX 메시지 |
+| `scenario.md`     | 유저 플로우              |
+
+커밋 전에는 `.claude/skills/commit/SKILL.md`를 조회해라.
```
