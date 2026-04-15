# Claude Code Hooks

Claude Code가 도구를 실행할 때 자동으로 규칙을 강제하는 훅 스크립트 모음.
모든 훅은 `.claude/settings.local.json`에 등록되어 있다.

---

## 훅 목록

### 1. `commit-msg-validate.sh`
- **트리거**: `PreToolUse` on `Bash` (git commit 명령 감지)
- **역할**: 커밋 메시지가 `<type>(scope): 내용` 형식인지 검증
- **허용 type**: `feat`, `fix`, `docs`, `style`, `refactor`, `setting`, `chore`
- **실패 시**: exit 2로 커밋 차단 + stderr에 안내

### 2. `no-any-check.sh`
- **트리거**: `PostToolUse` on `Write` 또는 `Edit`
- **역할**: `.ts` / `.tsx` 파일에서 `any` 타입 사용 검사
- **검출 패턴**: `: any`, `as any`, `<any>`, `any[]`, `Array<any>`
- **예외**: **없음** — 테스트/모킹 포함 전체 차단
- **실패 시**: exit 2 + 발견 라인 번호 출력

### 3. `file-naming-check.sh`
- **트리거**: `PostToolUse` on `Write`
- **역할**: 신규 파일·폴더명이 컨벤션을 따르는지 검증
- **검증 규칙**
  - `.tsx` 컴포넌트 → `PascalCase` (Next.js 관례 `page`/`layout`/`loading`/`error`/`not-found`는 예외)
  - `.ts` 유틸 → `camelCase`
  - 타입 파일 → `*.types.ts`
  - 상수 파일 → `*.const.ts`
  - 테스트 파일 → `*.test.ts(x)`
  - 폴더명 → `kebab-case`
- **실패 시**: exit 2 + 위반 사유 출력

---

## 연결 방법 (`settings.local.json`)

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [
          {
            "type": "command",
            "command": "$CLAUDE_PROJECT_DIR/.claude/hooks/commit-msg-validate.sh"
          }
        ]
      }
    ],
    "PostToolUse": [
      {
        "matcher": "Write|Edit",
        "hooks": [
          {
            "type": "command",
            "command": "$CLAUDE_PROJECT_DIR/.claude/hooks/no-any-check.sh"
          },
          {
            "type": "command",
            "command": "$CLAUDE_PROJECT_DIR/.claude/hooks/file-naming-check.sh"
          }
        ]
      }
    ]
  }
}
```

---

## 관련 문서
- [코드 컨벤션](../rules/conventions.md)
- [Git & 커밋 규칙](../rules/git-flow.md)
