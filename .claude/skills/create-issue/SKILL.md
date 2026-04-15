---
name: create-issue
description: 시작전에 이슈를 등록하고, 해당 이슈와 연동된 브랜치를 생성 후 checkout 한다. Use when user say "/create-issue".
user-invocable: true
disable-model-invocation: true
allowed-tools:
	- Bash
	- Github
	- Read
---
# Create Issue
작업 시작 전 GitHub 이슈를 등록하고, 이슈와 연동된 브랜치를 생성 후 자동으로 checkout한다.
## 실행 순서
### 1. 현재 레포 정보 확인
```bash
gh repo view --json nameWithOwner,defaultBranchRef
git branch --show-current
```
- 현재 디렉토리의 레포를 자동 감지한다.
- default branch(보통 `main` 또는 `develop`)를 기준으로 브랜치를 분기한다.
### 2. 이슈 정보 수집
사용자에게 아래 정보를 물어본다:
| 항목 | 설명 | 예시 |
|------|------|------|
| 제목 | 이슈 제목 (필수) | "로그인 버튼 클릭 시 에러 발생" |
| 타입 | 작업 유형 (필수) | feat / fix / refactor / chore / docs |
| 설명 | 상세 내용 (선택) | 재현 방법, 기대 동작 등 |
> 사용자가 `/create-issue 로그인 버튼 에러 수정` 처럼 제목을 함께 입력한 경우, 추가 질문 없이 바로 진행한다.
> 타입을 명시하지 않은 경우 제목을 보고 적절한 타입을 추론한다.
### 3. 이슈 생성 및 번호 캡처
```bash
ISSUE_NUMBER=$(gh issue create \
  --title "<타입>: <제목>" \
  --body "<설명>" \
  --label "<타입>" \
  --json number \
  --jq '.number')
```
### 4. 브랜치 네이밍 규칙
```
<타입>/#<이슈번호>-<kebab-case-이슈제목>
```
**예시:**
| 타입 | 이슈번호 | 제목 | 브랜치명 |
|------|----------|------|----------|
| feat | 42 | 소셜 로그인 추가 | `feat/#42-add-social-login` |
| fix | 17 | 로그인 버튼 에러 수정 | `fix/#17-fix-login-button-error` |
| refactor | 8 | 유저 서비스 분리 | `refactor/#8-split-user-service` |
**네이밍 규칙:**
- 영문 소문자, 숫자, 하이픈(`-`)만 사용
- 한글 제목은 의미를 살려 영문으로 변환
- 공백은 `-`로 치환, 특수문자 제거
- 40자 이내로 제한
### 5. 브랜치 생성 및 checkout
`gh issue develop`을 사용하여 GitHub 이슈와 브랜치를 연동한다.
```bash
gh issue develop $ISSUE_NUMBER \
  --name "<브랜치명>" \
  --base <default-branch> \
  --checkout
```
- `gh issue develop`은 GitHub API를 통해 브랜치를 생성하므로 이슈의 Development 섹션에 자동으로 연결된다.
- `--checkout` 플래그로 로컬 checkout까지 한 번에 처리한다.
### 6. 완료 메시지 출력
아래 형식으로 결과를 요약 출력한다:
```
✅ 이슈 생성 완료
   이슈: #42 feat: 소셜 로그인 추가
   URL : https://github.com/<owner>/<repo>/issues/42

🌿 브랜치 생성 및 checkout 완료
   브랜치: feat/#42-add-social-login
```
---
## 에러 처리
| 상황 | 처리 방법 |
|------|----------|
| `gh` 미설치 | `brew install gh` 안내 후 중단 |
| 미인증 상태 | `gh auth login` 안내 후 중단 |
| 브랜치명 중복 | 기존 브랜치로 checkout 여부를 사용자에게 확인 |
| git 레포가 아닌 경우 | 에러 메시지 출력 후 중단 |
---
## Rules
1. 이슈 생성 전 반드시 레포 정보와 현재 브랜치를 확인한다.
2. 브랜치는 항상 default branch 최신 커밋 기준으로 생성한다.
3. 한글 제목은 영문으로 변환하여 브랜치명에 사용한다.
4. 이슈 번호는 반드시 브랜치명에 포함한다 (`#이슈번호` 형식).
5. 사용자가 이미 제목과 타입을 제공한 경우 추가 질문 없이 즉시 실행한다.
6. 작업 완료 후 현재 브랜치가 올바른지 `git branch --show-current`로 확인한다.