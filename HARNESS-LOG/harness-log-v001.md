# harness-log-v001

> 생성일: 2026-04-18 00:00
> 커밋 대상: .claude/, CLAUDE.md

## 1. 변경 내용 요약

- `.claude/hooks/README.md`: 섹션 간 공백 추가로 가독성 개선; `harness-log-precommit.sh` 항목 제거 — 훅이 Husky(`.husky/`)로 이전되면서 설명 불필요
- `.claude/hooks/harness-log-precommit.sh`: 파일 삭제 — pre-commit 훅 본체 로직을 `.husky/harness-log.sh`로 이전
- `.claude/settings.json`: HARNESS-LOG 쓰기 권한을 `Write(HARNESS-LOG.md)` → `Write(HARNESS-LOG/**)` 로 변경 — 단일 파일이 아닌 디렉토리 내 모든 파일에 쓰기를 허용
- `.claude/skills/harness-log/SKILL.md`: `CHANGES` 변수 추가 및 트리 구조 예시 구체화; git add 스테이징 책임을 스킬 → 훅/사용자로 이전; 설치 섹션 제거; 표 서식 정렬

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
│   ├── [M] README.md
│   ├── commit-msg-validate.sh
│   ├── [D] harness-log-precommit.sh
│   ├── file-naming-check.sh
│   └── no-any-check.sh
├── rules/
│   ├── constraints.md
│   ├── conventions.md
│   └── git-flow.md
├── [M] settings.json
└── skills/
    ├── commit/
    │   └── SKILL.md
    ├── create-issue/
    │   └── SKILL.md
    ├── harness-log/
    │   └── [M] SKILL.md
    ├── issues.md
    └── pr/
        └── SKILL.md
```

## 3. Raw Diff

```diff
diff --git a/.claude/hooks/README.md b/.claude/hooks/README.md
index 6ead25d..0f1b26b 100644
--- a/.claude/hooks/README.md
+++ b/.claude/hooks/README.md
@@ -8,12 +8,14 @@ Claude Code가 도구를 실행할 때 자동으로 규칙을 강제하는 훅 
 ## 훅 목록
 
 ### 1. `commit-msg-validate.sh`
+
 - **트리거**: `PreToolUse` on `Bash` (git commit 명령 감지)
 - **역할**: 커밋 메시지가 `<type>(scope): 내용` 형식인지 검증
 - **허용 type**: `feat`, `fix`, `docs`, `style`, `refactor`, `setting`, `chore`
 - **실패 시**: exit 2로 커밋 차단 + stderr에 안내
 
 ### 2. `no-any-check.sh`
+
 - **트리거**: `PostToolUse` on `Write` 또는 `Edit`
 - **역할**: `.ts` / `.tsx` 파일에서 `any` 타입 사용 검사
 - **검출 패턴**: `: any`, `as any`, `<any>`, `any[]`, `Array<any>`
@@ -21,6 +23,7 @@ Claude Code가 도구를 실행할 때 자동으로 규칙을 강제하는 훅 
 - **실패 시**: exit 2 + 발견 라인 번호 출력
 
 ### 3. `file-naming-check.sh`
+
 - **트리거**: `PostToolUse` on `Write`
 - **역할**: 신규 파일·폴더명이 컨벤션을 따르는지 검증
 - **검증 규칙**
@@ -32,16 +35,6 @@ Claude Code가 도구를 실행할 때 자동으로 규칙을 강제하는 훅 
   - 폴더명 → `kebab-case`
 - **실패 시**: exit 2 + 위반 사유 출력
 
-### 4. `harness-log-precommit.sh`
-- **트리거**: git `pre-commit` (Claude Code 훅이 아닌 **git 훅**)
-- **역할**: `.claude/` 또는 `CLAUDE.md`의 스테이징된 변경을 감지하면 `harness-log` 스킬을 호출하여 `HARNESS-LOG/harness-log-vXXX.md` 패치노트를 생성·스테이징
-- **무한 루프 방지**: `HARNESS-LOG/` 외 변경이 있을 때만 트리거
-- **실패 동작**: 항상 exit 0 (커밋을 막지 않음)
-- **설치**: `bash .claude/hooks/install-pre-commit.sh` 실행 → `.git/hooks/pre-commit` 자동 생성
-- **연관 스킬**: [`.claude/skills/harness-log/SKILL.md`](../skills/harness-log/SKILL.md)
-
-> ⚠️ git 훅(`.git/hooks/`)은 git이 추적하지 않으므로 클론 후 한 번 설치해야 한다.
-
 ---
 
 ## 연결 방법 (`settings.local.json`)
@@ -82,5 +75,6 @@ Claude Code가 도구를 실행할 때 자동으로 규칙을 강제하는 훅 
 ---
 
 ## 관련 문서
+
 - [코드 컨벤션](../rules/conventions.md)
 - [Git & 커밋 규칙](../rules/git-flow.md)
diff --git a/.claude/hooks/harness-log-precommit.sh b/.claude/hooks/harness-log-precommit.sh
deleted file mode 100644
index 9fe2e50..0000000
--- a/.claude/hooks/harness-log-precommit.sh
+++ /dev/null
@@ -1,36 +0,0 @@
-#!/usr/bin/env bash
-# pre-commit 컨텍스트에서 .claude/ 또는 CLAUDE.md의 스테이징된 변경을 감지하면
-# harness-log 스킬을 트리거하여 HARNESS-LOG/harness-log-vXXX.md 패치노트를 생성한다.
-#
-# 이 스크립트는 .git/hooks/pre-commit이 호출하는 본체 로직이다.
-# 설치는 .claude/hooks/install-pre-commit.sh 참조.
-#
-# 무한 루프 방지: HARNESS-LOG/ 변경만 있을 때는 호출하지 않는다.
-# 실패해도 커밋이 막히지 않도록 항상 exit 0.
-
-set -u
-
-# 레포 루트로 이동 (서브디렉토리 커밋 대비)
-REPO_ROOT=$(git rev-parse --show-toplevel 2>/dev/null) || exit 0
-cd "$REPO_ROOT" || exit 0
-
-STAGED=$(git diff --cached --name-only)
-
-# .claude/ 또는 CLAUDE.md가 스테이징되었는지 확인
-TARGETS=$(printf '%s\n' "$STAGED" | grep -E '^(\.claude/|CLAUDE\.md$)' || true)
-if [ -z "$TARGETS" ]; then
-  exit 0
-fi
-
-# claude CLI가 없으면 조용히 스킵 (커밋은 진행)
-if ! command -v claude >/dev/null 2>&1; then
-  echo "[harness-log] claude CLI 미설치 — 패치노트 생성 스킵" >&2
-  exit 0
-fi
-
-# 스킬 트리거
-HARNESS_LOG_FROM_HOOK=1 claude -p "/harness-log" >/dev/null 2>&1 || {
-  echo "[harness-log] 스킬 실행 실패 — 커밋은 계속 진행" >&2
-}
-
-exit 0
diff --git a/.claude/settings.json b/.claude/settings.json
index 1a59075..2b0f65f 100644
--- a/.claude/settings.json
+++ b/.claude/settings.json
@@ -7,7 +7,7 @@
       "Grep",
       "LS",
       "Edit",
-      "Write(HARNESS-LOG.md)",
+      "Write(HARNESS-LOG/**)",
       "Bash(git status)",
       "Bash(git diff:*)",
       "Bash(git log:*)",
@@ -41,4 +41,4 @@
     "commit": "Generated with Claude Code\n\nCo-Authored-By: Claude <noreply@anthropic.com>",
     "pr": "Generated with Claude Code"
   }
-}
\ No newline at end of file
+}
diff --git a/.claude/skills/harness-log/SKILL.md b/.claude/skills/harness-log/SKILL.md
index 17899dc..5cd2e76 100644
--- a/.claude/skills/harness-log/SKILL.md
+++ b/.claude/skills/harness-log/SKILL.md
@@ -57,9 +57,11 @@ STAGED=$(git diff --cached --name-only -- .claude CLAUDE.md)
 \`\`\`bash
 DIFF=$(git diff --cached -- .claude CLAUDE.md)
 TREE=$(find .claude -type f 2>/dev/null | sort)
+CHANGES=$(git diff --cached --name-status -- .claude CLAUDE.md)
 \`\`\`
 
 - \`tree\`는 macOS 기본 미설치 → \`find ... | sort\` 사용
+- \`CHANGES\`: \`git diff --cached --name-status\` 결과로, 파일별 상태(\`A\`/\`M\`/\`D\`) 파악에 사용
 - \`.claude/\` 자체가 없으면 트리 섹션은 \`(없음)\`으로 표기하고 \`CLAUDE.md\`만 기록
 - \`DIFF\`가 비어있으면 (예: 모드 변경만) 파일 생성하지 않고 종료
```
