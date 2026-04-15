#!/usr/bin/env bash
# PreToolUse hook: git commit 메시지 컨벤션 검증
# 허용: <type>(scope?): 내용
# type: feat|fix|docs|style|refactor|setting|chore

set -euo pipefail

HOOK_INPUT=$(cat)
export HOOK_INPUT

parsed=$(/usr/bin/python3 -c '
import json, os, re, sys
raw = os.environ.get("HOOK_INPUT", "")
try:
    data = json.loads(raw)
except Exception:
    print("SKIP"); sys.exit(0)

tool_name = data.get("tool_name", "")
command = data.get("tool_input", {}).get("command", "")

if tool_name != "Bash" or "git commit" not in command:
    print("SKIP"); sys.exit(0)

m = re.search(r"-m\s+\"((?:[^\"\\\\]|\\\\.)*)\"", command) or re.search(r"-m\s+\x27((?:[^\x27\\\\]|\\\\.)*)\x27", command)
if not m:
    print("NOMSG"); sys.exit(0)

print("MSG:" + m.group(1))
')

case "$parsed" in
  SKIP) exit 0 ;;
  NOMSG)
    echo "커밋 메시지(-m)를 감지하지 못했습니다. 메시지 인자를 확인하세요." >&2
    exit 2
    ;;
  MSG:*)
    message="${parsed#MSG:}"
    ;;
  *)
    exit 0
    ;;
esac

pattern='^(feat|fix|docs|style|refactor|setting|chore)(\([a-z0-9-]+\))?: .+'

if ! printf '%s' "$message" | /usr/bin/grep -Eq "$pattern"; then
  cat >&2 <<EOF
커밋 메시지 컨벤션 위반.

받은 메시지: "$message"

형식: <type>(scope): 내용
  type: feat | fix | docs | style | refactor | setting | chore
  scope: 소문자, 숫자, 하이픈

예시:
  feat(admin): 어드민 로그인 로직 구현
  fix(auth): 토큰 만료 시 재발급 실패 버그 수정

규칙 파일: .claude/rules/git-flow.md
EOF
  exit 2
fi

exit 0
