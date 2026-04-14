#!/usr/bin/env bash
# PostToolUse hook: 파일·폴더명 네이밍 컨벤션 검증

set -euo pipefail

input=$(cat)

file_path=$(printf '%s' "$input" | /usr/bin/python3 -c 'import json,sys;d=json.load(sys.stdin);print(d.get("tool_input",{}).get("file_path",""))')

if [ -z "$file_path" ]; then
  exit 0
fi

# 프로젝트 루트 추출 (CLAUDE_PROJECT_DIR 환경변수 사용)
project_dir="${CLAUDE_PROJECT_DIR:-$(pwd)}"
rel_path="${file_path#$project_dir/}"

# .claude 내부 파일은 검사 제외
case "$rel_path" in
  .claude/*) exit 0 ;;
  node_modules/*) exit 0 ;;
esac

filename=$(/usr/bin/basename "$file_path")
dir_part=$(/usr/bin/dirname "$rel_path")

violations=()

# 폴더명 kebab-case 검증 (루트·. 제외)
if [ "$dir_part" != "." ] && [ -n "$dir_part" ]; then
  IFS='/' read -ra parts <<< "$dir_part"
  for part in "${parts[@]}"; do
    # __tests__ 예외
    if [ "$part" = "__tests__" ]; then
      continue
    fi
    if ! printf '%s' "$part" | /usr/bin/grep -Eq '^[a-z0-9]+(-[a-z0-9]+)*$'; then
      violations+=("폴더명 \"$part\"이 kebab-case가 아님")
    fi
  done
fi

# 파일명 검증
base="${filename%.*}"
ext="${filename##*.}"

is_valid_pascal() { printf '%s' "$1" | /usr/bin/grep -Eq '^[A-Z][A-Za-z0-9]*$'; }
is_valid_camel()  { printf '%s' "$1" | /usr/bin/grep -Eq '^[a-z][A-Za-z0-9]*$'; }

# Next.js 예외
next_exceptions="page layout loading error not-found template default global-error route middleware"

case "$filename" in
  # 테스트 파일
  *.test.ts|*.test.tsx)
    stem="${base%.test}"
    if [ "$ext" = "tsx" ]; then
      if ! is_valid_pascal "$stem" && ! is_valid_camel "$stem"; then
        violations+=("테스트 파일 \"$filename\"의 대상명 형식 오류")
      fi
    else
      if ! is_valid_camel "$stem" && ! is_valid_pascal "$stem"; then
        violations+=("테스트 파일 \"$filename\"의 대상명 형식 오류")
      fi
    fi
    ;;

  # 타입 파일
  *.types.ts)
    stem="${base%.types}"
    if ! is_valid_camel "$stem"; then
      violations+=("타입 파일 \"$filename\"의 prefix는 camelCase여야 함")
    fi
    ;;

  # 상수 파일
  *.const.ts)
    stem="${base%.const}"
    if ! is_valid_camel "$stem"; then
      violations+=("상수 파일 \"$filename\"의 prefix는 camelCase여야 함")
    fi
    ;;

  # 컴포넌트 (.tsx)
  *.tsx)
    matched_exception=false
    for exc in $next_exceptions; do
      if [ "$base" = "$exc" ]; then
        matched_exception=true
        break
      fi
    done
    if [ "$matched_exception" = false ] && ! is_valid_pascal "$base"; then
      violations+=("컴포넌트 파일 \"$filename\"은 PascalCase여야 함")
    fi
    ;;

  # 일반 .ts 유틸
  *.ts)
    # 설정 파일류 예외 (config, env 등)
    case "$base" in
      *.config|*.d|index|middleware) ;;
      *)
        if ! is_valid_camel "$base"; then
          violations+=("유틸 파일 \"$filename\"은 camelCase여야 함")
        fi
        ;;
    esac
    ;;
esac

if [ ${#violations[@]} -gt 0 ]; then
  {
    echo "파일 네이밍 컨벤션 위반:"
    echo ""
    echo "파일: $rel_path"
    echo ""
    for v in "${violations[@]}"; do
      echo "  - $v"
    done
    echo ""
    echo "규칙 파일: .claude/rules/conventions.md (2. 파일 및 폴더 구조)"
  } >&2
  exit 2
fi

exit 0
