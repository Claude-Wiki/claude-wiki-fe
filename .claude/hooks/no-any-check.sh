#!/usr/bin/env bash
# PostToolUse hook: .ts/.tsx 파일 내 any 사용 금지
# 예외 없음, 무조건 차단

set -euo pipefail

input=$(cat)

file_path=$(printf '%s' "$input" | /usr/bin/python3 -c 'import json,sys;d=json.load(sys.stdin);print(d.get("tool_input",{}).get("file_path",""))')

if [ -z "$file_path" ]; then
  exit 0
fi

case "$file_path" in
  *.ts|*.tsx) ;;
  *) exit 0 ;;
esac

if [ ! -f "$file_path" ]; then
  exit 0
fi

# : any / as any / <any> / any[] / Array<any> 검출
pattern=':\s*any(\s|[^A-Za-z0-9_])|as\s+any([^A-Za-z0-9_]|$)|<any>|any\[\]|Array<any>'

matches=$(/usr/bin/grep -nE "$pattern" "$file_path" || true)

if [ -n "$matches" ]; then
  cat >&2 <<EOF
\`any\` 타입 사용 감지됨. 프로젝트 규칙상 any는 절대 금지입니다.

파일: $file_path

위반 라인:
$matches

타입 추론 기능을 활용하거나 구체적인 타입을 정의하세요.
규칙 파일: .claude/rules/conventions.md (4. TypeScript 규칙)
EOF
  exit 2
fi

exit 0
