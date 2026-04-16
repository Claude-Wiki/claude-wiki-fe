---
name: harness-log
description: .claude/ 디렉토리 또는 CLAUDE.md의 스테이징된 변경을 감지하여 HARNESS-LOG/ 디렉토리에 버전별 Markdown 패치노트(harness-log-vXXX.md)를 자동 생성한다. pre-commit 훅에서 자동 호출되거나 사용자가 "/harness-log", "하네스 로그 기록", "harness-log 생성" 등으로 명시 요청할 때 사용.
user-invocable: true
allowed-tools:
  - Bash
  - Read
  - Write
  - Glob
---

# harness-log

`.claude/`와 `CLAUDE.md`의 변경을 버전별 패치노트로 기록하는 스킬.
하네스 구조 진화 이력을 추적하기 위한 자동화 도구.

---

## 트리거 조건

다음 중 하나라도 해당하면 이 스킬을 사용:

1. 사용자가 `.claude/` 또는 `CLAUDE.md`의 변경을 커밋하려 함
2. pre-commit 훅이 해당 경로의 스테이징 변경을 감지하여 Claude Code를 호출함
   (이때 환경변수 `HARNESS_LOG_FROM_HOOK=1`이 설정됨)
3. 사용자가 명시적으로 "하네스 로그 기록", "harness-log 생성", "/harness-log" 등을 요청

---

## 실행 워크플로우

### 1. 컨텍스트 판별

먼저 환경변수로 실행 컨텍스트를 구분:

```bash
if [ "${HARNESS_LOG_FROM_HOOK:-0}" = "1" ]; then
  CONTEXT=hook   # pre-commit 훅 컨텍스트
else
  CONTEXT=manual # 수동 실행 컨텍스트
fi
```

### 2. 변경사항 감지

```bash
git status --porcelain
git add .claude CLAUDE.md 2>/dev/null || true
STAGED=$(git diff --cached --name-only -- .claude CLAUDE.md)
```

- `STAGED`가 비어있으면 **즉시 종료**: `기록할 변경사항 없음` 출력 후 exit 0
- 해당 경로 외의 파일은 건드리지 않는다 (의도하지 않은 스테이징 방지)

### 3. Diff 및 디렉토리 구조 수집

```bash
DIFF=$(git diff --cached -- .claude CLAUDE.md)
TREE=$(find .claude -type f 2>/dev/null | sort)
```

- `tree`는 macOS 기본 미설치 → `find ... | sort` 사용
- `.claude/` 자체가 없으면 트리 섹션은 `(없음)`으로 표기하고 `CLAUDE.md`만 기록
- `DIFF`가 비어있으면 (예: 모드 변경만) 파일 생성하지 않고 종료

### 4. 다음 버전 번호 결정

```bash
mkdir -p HARNESS-LOG
LAST=$(ls HARNESS-LOG/harness-log-v*.md 2>/dev/null \
       | sed -E 's/.*harness-log-v0*([0-9]+)\.md/\1/' \
       | sort -n | tail -1)
NEXT=$(printf "%03d" $(( ${LAST:-0} + 1 )))
TARGET="HARNESS-LOG/harness-log-v${NEXT}.md"
```

- 디렉토리 없으면 생성 후 `v001`부터 시작
- 번호가 비연속(v001, v003)이어도 **최댓값 + 1** 사용 → v004
- `TARGET`이 이미 존재하면 (드물지만) 덮어쓰지 않고 에러 반환 후 중단

### 5. 패치노트 생성

`HARNESS-LOG/harness-log-vXXX.md`에 다음 3개 섹션을 **반드시** 포함:

```markdown
# harness-log-vXXX

> 생성일: YYYY-MM-DD HH:MM
> 커밋 대상: .claude/, CLAUDE.md

## 1. 변경 내용 요약

(Claude가 diff를 읽고 자연어로 요약. 무엇이 왜 바뀌었는지 불릿 형태로.
 예시:
 - `.claude/rules/conventions.md`: 타입 파일 명명 규칙 추가
 - `.claude/skills/harness-log/SKILL.md`: 신규 스킬 추가
 - `CLAUDE.md`: 디렉토리 구조 섹션 갱신
)

## 2. .claude 디렉토리 구조

\`\`\`
(find 결과 또는 tree 결과)
\`\`\`

## 3. Raw Diff

\`\`\`diff
(git diff --cached 전체 결과)
\`\`\`
```

요약 작성 가이드:
- 파일 단위로 1~2 불릿
- "무엇이" + "왜" 함께 (의도 추론) — diff에서 의도가 안 보이면 "무엇이"만 적는다
- 추측은 명시적으로 표시 (예: "(추정) 컨벤션 강화 목적")

### 6. 로그 파일 스테이징

```bash
git add "$TARGET"
```

### 7. 컨텍스트별 종료 처리

- **hook 컨텍스트** (`HARNESS_LOG_FROM_HOOK=1`):
  - 커밋을 직접 실행하지 않는다 (훅이 이어서 원래 커밋을 진행)
  - 스테이징만 하고 종료
- **manual 컨텍스트**:
  - 변경 파일을 사용자에게 보여주고 커밋 메시지 제안
  - `/commit` 스킬이 구현되어 있으면 그것을 호출, 아니면 사용자가 직접 커밋하도록 안내
  - **푸시는 자동으로 하지 않는다** (사용자 명시 요청 시에만)

### 8. 완료 메시지

스킬은 verbose 출력을 내지 않는다. 마지막에만 1~2줄로:

```
✓ harness-log-vXXX.md 생성 완료 (HARNESS-LOG/)
✓ 커밋에 포함되도록 스테이징됨
```

변경 없음으로 종료한 경우:

```
기록할 변경사항 없음 (.claude/, CLAUDE.md)
```

---

## 엣지 케이스

| 상황 | 처리 |
|------|------|
| `HARNESS-LOG/` 디렉토리 없음 | `mkdir -p`로 생성 |
| 기존 로그 번호 비연속 (v001, v003) | 최댓값 + 1 사용 (→ v004) |
| `.claude/` 디렉토리 자체가 없음 | `CLAUDE.md`만 기록, 트리 섹션은 `(없음)` |
| diff가 비어있음 | 파일 생성하지 않고 `기록할 변경사항 없음` 출력 후 종료 |
| 동일 번호 파일이 이미 존재 | 덮어쓰지 않고 에러 반환 후 중단 |
| 스테이징된 변경이 `HARNESS-LOG/` 뿐 | 무한 루프 방지를 위해 즉시 종료 |

---

## 무한 루프 방지

스킬 자체가 `HARNESS-LOG/` 파일을 스테이징하므로, 훅이 그걸 보고 다시 스킬을 호출하면 무한 루프가 된다.

훅 스크립트(`harness-log-precommit.sh`)가 다음과 같이 분기한다:

```bash
# 스테이징된 변경이 HARNESS-LOG/ 외에도 .claude/ 또는 CLAUDE.md에 있을 때만 트리거
NON_LOG=$(git diff --cached --name-only \
          | grep -E '^(\.claude/|CLAUDE\.md$)')
if [ -n "$NON_LOG" ]; then
  HARNESS_LOG_FROM_HOOK=1 claude -p "/harness-log"
fi
```

스킬 본체에서도 **`HARNESS-LOG/`만 스테이징된 상태로 진입한 경우** 즉시 종료한다.

---

## pre-commit 훅 설치

git hooks 디렉토리(`.git/hooks/`)는 git이 추적하지 않으므로 별도 설치가 필요하다.

```bash
bash .claude/hooks/install-pre-commit.sh
```

자세한 내용은 [`.claude/hooks/README.md`](../../hooks/README.md) 참조.

---

## Rules

1. **사용자가 명시적으로 요청하지 않은 파일은 절대 스테이징하지 않는다** (`git add .` 금지)
2. 패치노트 생성 후에는 반드시 해당 파일을 `git add`로 스테이징한다
3. hook 컨텍스트에서는 절대 `git commit` 또는 `git push`를 실행하지 않는다
4. manual 컨텍스트에서도 푸시는 사용자 명시 요청이 있을 때만
5. 출력은 조용히 — 진행 상황 중계 금지, 최종 1~2줄만
6. 동일 버전 파일을 덮어쓰지 않는다 (충돌 시 중단)
