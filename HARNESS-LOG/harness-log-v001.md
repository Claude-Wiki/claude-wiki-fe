# harness-log-v001

> 생성일: 2026-04-19 01:56
> 커밋 대상: CLAUDE.md

## 1. 변경 내용 요약

- `CLAUDE.md` (디렉토리 구조 섹션): `context/`를 루트가 아닌 `.claude/context/`로 이동하여 실제 파일 위치와 일치하도록 수정. `context/architecture.md`, `connect.md`, `api.md`, `design.md`, `scenario.md` 5개 파일 추가 명시.
- `CLAUDE.md` (skills 경로): `commit.md` → `commit/SKILL.md`, `pr.md` → `pr/SKILL.md` 로 경로 구조 변경 반영. (추정) skills를 디렉토리 단위로 분리한 구조 변경에 대응.
- `CLAUDE.md` (지시 참고 사항): 산문형 지시 4줄을 테이블 형식으로 재구성. 각 context 파일의 역할을 명확히 정의하고, 불필요한 항목(`DESIGN.md`, `UXWriting.md`) 제거.

## 2. .claude 디렉토리 구조

```
.claude/agent/reviewer.md
.claude/context/api.md
.claude/context/architecture.md
.claude/context/connect.md
.claude/context/design.md
.claude/context/scenario.md
.claude/hooks/README.md
.claude/hooks/commit-msg-validate.sh
.claude/hooks/file-naming-check.sh
.claude/hooks/harness-log-precommit.sh
.claude/hooks/no-any-check.sh
.claude/rules/constraints.md
.claude/rules/conventions.md
.claude/rules/git-flow.md
.claude/settings.json
.claude/settings.local.json
.claude/skills/commit/SKILL.md
.claude/skills/create-issue/SKILL.md
.claude/skills/harness-log/SKILL.md
.claude/skills/issues.md
.claude/skills/pr/SKILL.md
```

## 3. Raw Diff

```diff
diff --git a/claude.md b/claude.md
index a5c7e6d..6062c0e 100644
--- a/claude.md
+++ b/claude.md
@@ -24,22 +24,24 @@ claude-wiki-fe/
 ├── .claude/
 │   ├── agent/                  # 멀티 에이전트 구성 관련
 │   │   └── reviewer.md
+│   ├── context/                # 프로젝트 맥락
+│   │   ├── architecture.md     # 아키텍처
+│   │   ├── api.md              # API 명세 (Firestore 컬렉션/쿼리)
+│   │   ├── connect.md          # Firebase 연결 가이드
+│   │   ├── design.md           # 디자인 시스템 (Notion 스타일)
+│   │   └── scenario.md         # 유저 시나리오
 │   ├── hooks/                  # 작업 전후 자동 실행 스크립트
 │   ├── rules/                  # Claude가 따라야 할 도메인 규칙
 │   │   ├── constraints.md
 │   │   ├── git-flow.md
 │   │   └── conventions.md
 │   ├── skills/                 # 재사용 가능한 작업 단위
-│   │   ├── commit.md           # commit 플로우
-│   │   ├── pr.md               # pr 플로우
+│   │   ├── commit/SKILL.md     # commit 플로우
+│   │   ├── pr/SKILL.md         # pr 플로우
 │   │   └── issues.md           # issue 플로우
 │   └── settings.json           # 권한 및 동작 설정
-├── context/                    # 기타 프로젝트 맥락
-│   ├── architecture.md         # 아키텍처
-│   └── scenario.md             # 유저 시나리오
 ├── .gitignore
 ├── CLAUDE.md
-├── DESIGN.md                   # 공통 디자인 시스템
 ├── HARNESS-LOG.md              # 하네스 실험 기록 (절대 임의 수정 금지)
 └── README.md
```

@@ -63,7 +65,14 @@ claude-wiki-fe/

## 지시 참고 사항

-- 커밋 전에는 skills/commit.md를 조회홰라.
-- UX/UI 디자인을 할때 design.md을 참조해라.
-- 메시지를 작성할때는 context/UXWriting.md을 참조해라.
-- 유저 플로우를 고려할때에는 context/scenario.md을 참조해라. +작업 전 `.claude/context/` 안의 관련 파일을 확인해라.

- +| 파일 | 역할 |
  +| ----------------- | ------------------------ |
  +| `architecture.md` | 전체 구조, 패턴 |
  +| `api.md` | Firestore 컬렉션/쿼리 |
  +| `connect.md` | Firebase 연결 |
  +| `design.md` | 디자인 시스템, UX 메시지 |
  +| `scenario.md` | 유저 플로우 |
- +커밋 전에는 `.claude/skills/commit/SKILL.md`를 조회해라.

```

```
