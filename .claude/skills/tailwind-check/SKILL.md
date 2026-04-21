---
name: tailwind-check
description: Tailwind CSS 사용 현황을 점검한다. CSS 파일 현황과 Tailwind 클래스 사용 비율을 분석하여 컨벤션 준수 여부를 리포트한다.
user-invocable: true
disable-model-invocation: true
allowed-tools:
  - Bash(find:*)
  - Bash(grep:*)
  - Bash(wc:*)
  - Bash(cat:*)
  - Glob
  - Grep
  - Read
---

# /tailwind-check — Tailwind 사용 현황 점검

이 커맨드는 프로젝트에서 Tailwind CSS 컨벤션이 지켜지고 있는지 점검한다.
**코드를 수정하지 않는다. 읽고 리포트만 한다.**

## 실행 순서

### 1. Tailwind 설정 확인

```bash
find . -name "tailwind.config.*" -not -path "*/node_modules/*"
cat tailwind.config.* 2>/dev/null || echo "NOT FOUND"
```

tailwind.config 파일이 없으면 "Tailwind 미설정" 경고를 출력하고 계속 진행한다.

### 2. CSS 파일 현황 파악

```bash
find ./src -name "*.css" -not -path "*/node_modules/*"
```

각 CSS 파일에 대해 아래를 실행한다:

```bash
wc -l <파일경로>
grep -cE "margin|padding|color|font|display|flex|grid|width|height|background" <파일경로> || true
```

### 3. Tailwind 클래스 사용 현황 파악

```bash
grep -rl "class=" ./src --include="*.ts" --include="*.html" | wc -l
grep -rEl "class(Name)?=\"[^\"]*\b(flex|grid|p-|m-|text-|bg-|w-|h-|border|rounded|shadow)[^\"]*\"" ./src --include="*.ts" --include="*.html" | wc -l
```

### 4. 리포트 출력

아래 형식으로 결과를 대화창에 직접 출력한다. 파일로 저장하지 않는다.

---

## Tailwind 사용 현황 리포트

### Tailwind 설정

- tailwind.config 파일: 있음 / 없음 ⚠️

### CSS 파일 현황

| 파일                            | 라인 수 | Tailwind 대체 가능 속성 수 |
| ------------------------------- | ------- | -------------------------- |
| src/pages/blog/BlogListPage.css | 213줄   | 8개                        |

**총 CSS 파일: N개 / 총 N줄**

### Tailwind 클래스 사용

- Tailwind 유틸리티 클래스 감지된 파일: N개

### 판정

- 🔴 **주의**: CSS 파일이 많고 Tailwind 사용이 적음
- 🟡 **경고**: CSS와 Tailwind 혼재
- 🟢 **양호**: Tailwind 중심으로 개발 중

### 주요 개선 대상

Tailwind로 대체 가능한 속성이 많은 파일 상위 3개를 나열한다.

---

## Rules

- 코드를 절대 수정하지 않는다.
- node_modules, dist, build 디렉토리는 제외한다.
- 리포트는 대화창에 직접 출력한다. 파일로 저장하지 않는다.
