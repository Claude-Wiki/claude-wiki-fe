# Claude Wiki — 클로드 코드 원정대

## 프로젝트 개요

우아한테크코스 클로드 코드 원정대 멤버들이 Claude Code를 직접 사용하며
쌓은 인사이트와 블로그 포스트를 모아 만드는 나무위키 스타일의 지식 베이스.
Claude Code가 콘텐츠 작성, 구조화, 연결을 직접 수행하는 것이 핵심 컨셉.

## 핵심 기능

- CLAUDE 사용 경험 기반 문서 작성
- 카테고리(태그)별 문서 탐색
- 검색 기능

## 아키텍쳐

(프로젝트 시작 시 작성)

## 디렉토리 구조

claude-wiki-fe/
├── src/
├── .claude/
│   ├── agent/              # 멀티 에이전트 구성 관련
│       └── reviewer.md         
│   ├── hooks/              # 작업 전후 자동 실행 스크립트
│   ├── rules/                  # Claude가 따라야 할 도메인 규칙
│   │   ├── constraints.md
│   │   ├── git-flow.md
│   │   └── convention.md
│   ├── skills/             # 재사용 가능한 작업 단위
│   │   ├── commit.md           # commit 플로우
│   │   ├── pr.md               # pr 플로우
│   │   └── issues.md           # issue 플로우
│   ├── settings.json       # 권한 및 동작 설정
├── context/                # 기타 프로젝트 맥락 (etc.)
│   │   ├── architecture.md         # 유저 시나리오
│   │   └── scenario.md             # 유저 시나리오
├── .gitignore
├── CLAUDE.md
├── DESIGN.md               # 공통 디자인 시스템
├── HARNESS-LOG.md          # 하네스 실험 기록 (절대 임의 수정 금지)
└── README.md


## 기술 스택(버전 명시)

- javascript, typescript(5.X)
- tailwind CSS(4.X)
  (프로젝트 시작 시 작성)

## 빌드 명령어

(프로젝트 시작 시 작성)

## 작업 흐름

(프로젝트 시작 시 작성)

## 지시 참고 사항

- 커밋 전에는 skills/commit.md를 조회홰라.
- UX/UI 디자인을 할때 design.md을 참조해라.
- 메시지를 작성할때는 context/UXWriting.md을 참조해라.
