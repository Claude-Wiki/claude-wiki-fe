#!/usr/bin/env bash
# pre-commit 컨텍스트에서 .claude/ 또는 CLAUDE.md의 스테이징된 변경을 감지하면
# harness-log 스킬을 트리거하여 HARNESS-LOG/harness-log-vXXX.md 패치노트를 생성한다.
#
# 이 스크립트는 .git/hooks/pre-commit이 호출하는 본체 로직이다.
# 설치는 .claude/hooks/install-pre-commit.sh 참조.
#
# 무한 루프 방지: HARNESS-LOG/ 변경만 있을 때는 호출하지 않는다.
# 실패해도 커밋이 막히지 않도록 항상 exit 0.

set -u

# 레포 루트로 이동 (서브디렉토리 커밋 대비)
REPO_ROOT=$(git rev-parse --show-toplevel 2>/dev/null) || exit 0
cd "$REPO_ROOT" || exit 0

STAGED=$(git diff --cached --name-only)

# .claude/ 또는 CLAUDE.md가 스테이징되었는지 확인
TARGETS=$(printf '%s\n' "$STAGED" | grep -E '^(\.claude/|CLAUDE\.md$)' || true)
if [ -z "$TARGETS" ]; then
  exit 0
fi

# claude CLI가 없으면 조용히 스킵 (커밋은 진행)
if ! command -v claude >/dev/null 2>&1; then
  echo "[harness-log] claude CLI 미설치 — 패치노트 생성 스킵" >&2
  exit 0
fi

# 스킬 트리거
HARNESS_LOG_FROM_HOOK=1 claude -p "/harness-log" >/dev/null 2>&1 || {
  echo "[harness-log] 스킬 실행 실패 — 커밋은 계속 진행" >&2
}

exit 0
