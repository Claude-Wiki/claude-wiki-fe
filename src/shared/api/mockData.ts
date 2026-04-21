import { Timestamp } from 'firebase/firestore';
import type { Post } from '@/shared/types/post.types';

const now = Timestamp.now();

export const MOCK_POSTS: Post[] = [
  {
    id: 'mock-1',
    postType: 'docs',
    title: 'Claude Code 시작하기',
    slug: 'claude-code-getting-started',
    category: 'docs',
    tags: ['claude-code', '설치', '입문'],
    author: { uid: 'mock-user', displayName: '클로드 원정대' },
    published: true,
    createdAt: now,
    updatedAt: now,
    content: `## 설치 방법

Claude Code는 npm을 통해 간편하게 설치할 수 있습니다. 터미널에서 아래 명령어를 실행하면 전역으로 설치되며, 이후 어떤 디렉토리에서든 claude 명령어를 사용할 수 있습니다.

\`\`\`bash
npm install -g @anthropic-ai/claude-code
\`\`\`

## CLI 기본 명령어

Claude Code의 핵심 명령어를 알아봅시다.

\`\`\`bash
claude          # 대화형 세션 시작
claude commit   # 커밋 메시지 자동 생성
claude review   # 코드 리뷰 요청
\`\`\`

## 프로젝트 설정

프로젝트 루트에 CLAUDE.md 파일을 생성하면 Claude Code에게 프로젝트의 컨텍스트를 전달할 수 있습니다. 기술 스택, 코드 컨벤션, 디렉토리 구조 등을 명시하면 더 정확한 코드를 생성합니다.

\`\`\`markdown
# CLAUDE.md
기술 스택: TypeScript, React, Tailwind
패키지 매니저: Bun
\`\`\`
`,
  },
  {
    id: 'mock-2',
    postType: 'docs',
    title: 'MCP 서버 설정',
    slug: 'mcp-server-setup',
    category: 'docs',
    tags: ['mcp', '설정'],
    author: { uid: 'mock-user', displayName: '클로드 원정대' },
    published: true,
    createdAt: now,
    updatedAt: now,
    content: `## MCP란?

Model Context Protocol(MCP)은 Claude Code가 외부 도구와 통신하는 방식입니다.

## 설정 방법

\`settings.json\`에 MCP 서버를 추가합니다.
`,
  },
  {
    id: 'mock-3',
    postType: 'blog',
    title: 'Claude Code로 PR 자동화하기',
    slug: 'pr-automation-with-claude',
    category: 'blog',
    tags: ['자동화', 'PR', '워크플로우'],
    author: { uid: 'mock-user', displayName: '클로드 원정대' },
    published: true,
    createdAt: now,
    updatedAt: now,
    content: `## PR 자동화의 필요성

반복적인 PR 작성 작업을 Claude Code로 자동화하면 개발 속도를 크게 높일 수 있습니다.

## 스킬 설정

\`.claude/skills/pr.md\`에 PR 생성 플로우를 정의하면 Claude Code가 자동으로 PR을 생성합니다.

## 결과

팀 전체의 PR 작성 시간이 70% 단축되었습니다.
`,
  },
];
