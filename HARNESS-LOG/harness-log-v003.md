# harness-log-v003

> 생성일: 2026-04-19 00:00
> 커밋 대상: .claude/, CLAUDE.md

## 1. 변경 내용 요약

- `.claude/settings.json`: `"Write(.claude/**)"` 및 `"Write(CLAUDE.md)"` deny 규칙을 임시 주석 처리 — 스킬 파일 및 CLAUDE.md 수정을 위한 일시적 권한 해제
- `.claude/skills/tailwind-check/SKILL.md`: 신규 스킬 추가 — Tailwind CSS 사용 현황 점검 커맨드 (`/tailwind-check`). 컨벤션상 Tailwind를 쓰기로 했으나 plain CSS로 개발되는 상황을 주기적으로 점검하기 위한 목적
- `CLAUDE.md`: 디렉토리 구조 섹션에 `create-issue/SKILL.md`, `tailwind-check/SKILL.md` 항목 추가 및 `/tailwind-check` 사용 안내 추가

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
├── skills/
│   ├── commit/
│   │   └── SKILL.md
│   ├── create-issue/
│   │   └── SKILL.md
│   ├── harness-log/
│   │   └── SKILL.md
│   ├── pr/
│   │   └── SKILL.md
│   ├── [A] tailwind-check/
│   │   └── SKILL.md
│   └── issues.md
├── [M] settings.json
└── settings.local.json
[M] CLAUDE.md
```

## 3. Raw Diff

```diff
diff --git a/.claude/settings.json b/.claude/settings.json
index 2b0f65f..87c2b32 100644
--- a/.claude/settings.json
+++ b/.claude/settings.json
@@ -18,8 +18,8 @@
       "Bash(gh issue view:*)"
     ],
     "deny": [
-      "Write(.claude/**)",
-      "Write(CLAUDE.md)",
+      // "Write(.claude/**)",
+      // "Write(CLAUDE.md)",
       "Bash(git merge:*)",
       "Bash(git rebase:*)",
       "Bash(git push --force:*)",
diff --git a/.claude/skills/tailwind-check/SKILL.md b/.claude/skills/tailwind-check/SKILL.md
new file mode 100644
index 0000000..e083231
--- /dev/null
+++ b/.claude/skills/tailwind-check/SKILL.md
@@ -0,0 +1,86 @@
+---
+name: tailwind-check
+description: Tailwind CSS 사용 현황을 점검한다. CSS 파일 현황과 Tailwind 클래스 사용 비율을 분석하여 컨벤션 준수 여부를 리포트한다.
+user-invocable: true
+...
diff --git a/CLAUDE.md b/CLAUDE.md
index 73cc0bf..10fd5b2 100644
--- a/CLAUDE.md
+++ b/CLAUDE.md
@@ -36,9 +36,10 @@ claude-wiki-fe/
 │   ├── skills/                 # 재사용 가능한 작업 단위
-│   │   ├── commit/SKILL.md     # commit 플로우
-│   │   ├── pr/SKILL.md         # pr 플로우
-│   │   └── issues.md           # issue 플로우
+│   │   ├── commit/SKILL.md          # commit 플로우
+│   │   ├── pr/SKILL.md              # pr 플로우
+│   │   ├── create-issue/SKILL.md    # issue 생성 플로우
+│   │   └── tailwind-check/SKILL.md  # Tailwind 사용 현황 점검
@@ -78,3 +79,5 @@ claude-wiki-fe/
 커밋 전에는 `.claude/skills/commit/SKILL.md`를 조회해라.
+
+Tailwind 컨벤션 준수 여부를 점검할 때는 `/tailwind-check`를 실행해라.
```
