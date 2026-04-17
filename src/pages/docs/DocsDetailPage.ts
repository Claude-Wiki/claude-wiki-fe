import { DocsDetailView } from '@/domains/docs/detail/view/DocsDetailView';
import type { DocContent, DocItem } from '@/domains/docs/types/docs.types';

const DOC_LIST: DocItem[] = [
  { slug: 'getting-started', title: 'Claude Code 시작하기' },
  { slug: 'mcp-setup', title: 'MCP 서버 설정' },
  { slug: 'multi-agent', title: '멀티 에이전트 활용법' },
  { slug: 'prompt-engineering', title: '프롬프트 엔지니어링 팁' },
  { slug: 'shortcuts', title: 'Claude Code 단축키 모음' },
  { slug: 'automation', title: '자동화 워크플로우' },
  { slug: 'git-guide', title: 'Git 연동 가이드' },
  { slug: 'troubleshooting', title: '트러블슈팅 FAQ' },
];

const DOC_CONTENTS: Record<string, DocContent> = {
  'getting-started': {
    slug: 'getting-started',
    title: 'Claude Code 시작하기',
    category: 'Getting Started',
    breadcrumb: 'Docs &gt; Claude Code &gt; 시작하기',
    sections: [
      { id: 'install', level: 2, title: '설치 방법' },
      { id: 'cli-commands', level: 2, title: 'CLI 기본 명령어' },
      { id: 'project-setup', level: 2, title: '프로젝트 설정' },
    ],
    html: `
      <h2 id="install" class="docs-h2">설치 방법</h2>
      <p class="docs-p">Claude Code는 npm을 통해 간편하게 설치할 수 있습니다. 터미널에서 아래 명령어를 실행하면 전역으로 설치되며, 이후 어떤 디렉토리에서든 claude 명령어를 사용할 수 있습니다.</p>
      <pre class="docs-code-block"><code>npm install -g @anthropic-ai/claude-code</code></pre>
      <h2 id="cli-commands" class="docs-h2">CLI 기본 명령어</h2>
      <p class="docs-p">Claude Code의 핵심 명령어를 알아봅시다. claude 명령어로 대화형 세션을 시작하고, claude commit으로 자동 커밋 메시지를 생성할 수 있습니다. 또한 claude review를 통해 코드 리뷰를 받을 수도 있습니다.</p><p class="docs-p">Claude Code의 핵심 명령어를 알아봅시다. claude 명령어로 대화형 세션을 시작하고, claude commit으로 자동 커밋 메시지를 생성할 수 있습니다. 또한 claude review를 통해 코드 리뷰를 받을 수도 있습니다.</p><p class="docs-p">Claude Code의 핵심 명령어를 알아봅시다. claude 명령어로 대화형 세션을 시작하고, claude commit으로 자동 커밋 메시지를 생성할 수 있습니다. 또한 claude review를 통해 코드 리뷰를 받을 수도 있습니다.</p><p class="docs-p">Claude Code의 핵심 명령어를 알아봅시다. claude 명령어로 대화형 세션을 시작하고, claude commit으로 자동 커밋 메시지를 생성할 수 있습니다. 또한 claude review를 통해 코드 리뷰를 받을 수도 있습니다.</p><p class="docs-p">Claude Code의 핵심 명령어를 알아봅시다. claude 명령어로 대화형 세션을 시작하고, claude commit으로 자동 커밋 메시지를 생성할 수 있습니다. 또한 claude review를 통해 코드 리뷰를 받을 수도 있습니다.</p><p class="docs-p">Claude Code의 핵심 명령어를 알아봅시다. claude 명령어로 대화형 세션을 시작하고, claude commit으로 자동 커밋 메시지를 생성할 수 있습니다. 또한 claude review를 통해 코드 리뷰를 받을 수도 있습니다.</p><p class="docs-p">Claude Code의 핵심 명령어를 알아봅시다. claude 명령어로 대화형 세션을 시작하고, claude commit으로 자동 커밋 메시지를 생성할 수 있습니다. 또한 claude review를 통해 코드 리뷰를 받을 수도 있습니다.</p><p class="docs-p">Claude Code의 핵심 명령어를 알아봅시다. claude 명령어로 대화형 세션을 시작하고, claude commit으로 자동 커밋 메시지를 생성할 수 있습니다. 또한 claude review를 통해 코드 리뷰를 받을 수도 있습니다.</p><p class="docs-p">Claude Code의 핵심 명령어를 알아봅시다. claude 명령어로 대화형 세션을 시작하고, claude commit으로 자동 커밋 메시지를 생성할 수 있습니다. 또한 claude review를 통해 코드 리뷰를 받을 수도 있습니다.</p><p class="docs-p">Claude Code의 핵심 명령어를 알아봅시다. claude 명령어로 대화형 세션을 시작하고, claude commit으로 자동 커밋 메시지를 생성할 수 있습니다. 또한 claude review를 통해 코드 리뷰를 받을 수도 있습니다.</p><p class="docs-p">Claude Code의 핵심 명령어를 알아봅시다. claude 명령어로 대화형 세션을 시작하고, claude commit으로 자동 커밋 메시지를 생성할 수 있습니다. 또한 claude review를 통해 코드 리뷰를 받을 수도 있습니다.</p><p class="docs-p">Claude Code의 핵심 명령어를 알아봅시다. claude 명령어로 대화형 세션을 시작하고, claude commit으로 자동 커밋 메시지를 생성할 수 있습니다. 또한 claude review를 통해 코드 리뷰를 받을 수도 있습니다.</p><p class="docs-p">Claude Code의 핵심 명령어를 알아봅시다. claude 명령어로 대화형 세션을 시작하고, claude commit으로 자동 커밋 메시지를 생성할 수 있습니다. 또한 claude review를 통해 코드 리뷰를 받을 수도 있습니다.</p><p class="docs-p">Claude Code의 핵심 명령어를 알아봅시다. claude 명령어로 대화형 세션을 시작하고, claude commit으로 자동 커밋 메시지를 생성할 수 있습니다. 또한 claude review를 통해 코드 리뷰를 받을 수도 있습니다.</p><p class="docs-p">Claude Code의 핵심 명령어를 알아봅시다. claude 명령어로 대화형 세션을 시작하고, claude commit으로 자동 커밋 메시지를 생성할 수 있습니다. 또한 claude review를 통해 코드 리뷰를 받을 수도 있습니다.</p><p class="docs-p">Claude Code의 핵심 명령어를 알아봅시다. claude 명령어로 대화형 세션을 시작하고, claude commit으로 자동 커밋 메시지를 생성할 수 있습니다. 또한 claude review를 통해 코드 리뷰를 받을 수도 있습니다.</p><p class="docs-p">Claude Code의 핵심 명령어를 알아봅시다. claude 명령어로 대화형 세션을 시작하고, claude commit으로 자동 커밋 메시지를 생성할 수 있습니다. 또한 claude review를 통해 코드 리뷰를 받을 수도 있습니다.</p><p class="docs-p">Claude Code의 핵심 명령어를 알아봅시다. claude 명령어로 대화형 세션을 시작하고, claude commit으로 자동 커밋 메시지를 생성할 수 있습니다. 또한 claude review를 통해 코드 리뷰를 받을 수도 있습니다.</p><p class="docs-p">Claude Code의 핵심 명령어를 알아봅시다. claude 명령어로 대화형 세션을 시작하고, claude commit으로 자동 커밋 메시지를 생성할 수 있습니다. 또한 claude review를 통해 코드 리뷰를 받을 수도 있습니다.</p><p class="docs-p">Claude Code의 핵심 명령어를 알아봅시다. claude 명령어로 대화형 세션을 시작하고, claude commit으로 자동 커밋 메시지를 생성할 수 있습니다. 또한 claude review를 통해 코드 리뷰를 받을 수도 있습니다.</p><p class="docs-p">Claude Code의 핵심 명령어를 알아봅시다. claude 명령어로 대화형 세션을 시작하고, claude commit으로 자동 커밋 메시지를 생성할 수 있습니다. 또한 claude review를 통해 코드 리뷰를 받을 수도 있습니다.</p><p class="docs-p">Claude Code의 핵심 명령어를 알아봅시다. claude 명령어로 대화형 세션을 시작하고, claude commit으로 자동 커밋 메시지를 생성할 수 있습니다. 또한 claude review를 통해 코드 리뷰를 받을 수도 있습니다.</p><p class="docs-p">Claude Code의 핵심 명령어를 알아봅시다. claude 명령어로 대화형 세션을 시작하고, claude commit으로 자동 커밋 메시지를 생성할 수 있습니다. 또한 claude review를 통해 코드 리뷰를 받을 수도 있습니다.</p><p class="docs-p">Claude Code의 핵심 명령어를 알아봅시다. claude 명령어로 대화형 세션을 시작하고, claude commit으로 자동 커밋 메시지를 생성할 수 있습니다. 또한 claude review를 통해 코드 리뷰를 받을 수도 있습니다.</p><p class="docs-p">Claude Code의 핵심 명령어를 알아봅시다. claude 명령어로 대화형 세션을 시작하고, claude commit으로 자동 커밋 메시지를 생성할 수 있습니다. 또한 claude review를 통해 코드 리뷰를 받을 수도 있습니다.</p><p class="docs-p">Claude Code의 핵심 명령어를 알아봅시다. claude 명령어로 대화형 세션을 시작하고, claude commit으로 자동 커밋 메시지를 생성할 수 있습니다. 또한 claude review를 통해 코드 리뷰를 받을 수도 있습니다.</p><p class="docs-p">Claude Code의 핵심 명령어를 알아봅시다. claude 명령어로 대화형 세션을 시작하고, claude commit으로 자동 커밋 메시지를 생성할 수 있습니다. 또한 claude review를 통해 코드 리뷰를 받을 수도 있습니다.</p><p class="docs-p">Claude Code의 핵심 명령어를 알아봅시다. claude 명령어로 대화형 세션을 시작하고, claude commit으로 자동 커밋 메시지를 생성할 수 있습니다. 또한 claude review를 통해 코드 리뷰를 받을 수도 있습니다.</p><p class="docs-p">Claude Code의 핵심 명령어를 알아봅시다. claude 명령어로 대화형 세션을 시작하고, claude commit으로 자동 커밋 메시지를 생성할 수 있습니다. 또한 claude review를 통해 코드 리뷰를 받을 수도 있습니다.</p><p class="docs-p">Claude Code의 핵심 명령어를 알아봅시다. claude 명령어로 대화형 세션을 시작하고, claude commit으로 자동 커밋 메시지를 생성할 수 있습니다. 또한 claude review를 통해 코드 리뷰를 받을 수도 있습니다.</p><p class="docs-p">Claude Code의 핵심 명령어를 알아봅시다. claude 명령어로 대화형 세션을 시작하고, claude commit으로 자동 커밋 메시지를 생성할 수 있습니다. 또한 claude review를 통해 코드 리뷰를 받을 수도 있습니다.</p><p class="docs-p">Claude Code의 핵심 명령어를 알아봅시다. claude 명령어로 대화형 세션을 시작하고, claude commit으로 자동 커밋 메시지를 생성할 수 있습니다. 또한 claude review를 통해 코드 리뷰를 받을 수도 있습니다.</p>
      <pre class="docs-code-block"><code>claude          # 대화형 세션 시작
claude commit   # 커밋 메시지 자동 생성
claude review   # 코드 리뷰 요청</code></pre>
      <h2 id="project-setup" class="docs-h2">프로젝트 설정</h2>
      <p class="docs-p">프로젝트 루트에 CLAUDE.md 파일을 생성하면 Claude Code에게 프로젝트의 컨텍스트를 전달할 수 있습니다. 기술 스택, 코드 컨벤션, 디렉토리 구조 등을 명시하면 더 정확한 코드를 생성합니다.</p>
      <pre class="docs-code-block"><code><span class="docs-code-comment"># CLAUDE.md</span>
      <p class="docs-p">프로젝트 루트에 CLAUDE.md 파일을 생성하면 Claude Code에게 프로젝트의 컨텍스트를 전달할 수 있습니다. 기술 스택, 코드 컨벤션, 디렉토리 구조 등을 명시하면 더 정확한 코드를 생성합니다.</p><p class="docs-p">프로젝트 루트에 CLAUDE.md 파일을 생성하면 Claude Code에게 프로젝트의 컨텍스트를 전달할 수 있습니다. 기술 스택, 코드 컨벤션, 디렉토리 구조 등을 명시하면 더 정확한 코드를 생성합니다.</p><p class="docs-p">프로젝트 루트에 CLAUDE.md 파일을 생성하면 Claude Code에게 프로젝트의 컨텍스트를 전달할 수 있습니다. 기술 스택, 코드 컨벤션, 디렉토리 구조 등을 명시하면 더 정확한 코드를 생성합니다.</p><p class="docs-p">프로젝트 루트에 CLAUDE.md 파일을 생성하면 Claude Code에게 프로젝트의 컨텍스트를 전달할 수 있습니다. 기술 스택, 코드 컨벤션, 디렉토리 구조 등을 명시하면 더 정확한 코드를 생성합니다.</p><p class="docs-p">프로젝트 루트에 CLAUDE.md 파일을 생성하면 Claude Code에게 프로젝트의 컨텍스트를 전달할 수 있습니다. 기술 스택, 코드 컨벤션, 디렉토리 구조 등을 명시하면 더 정확한 코드를 생성합니다.</p><p class="docs-p">프로젝트 루트에 CLAUDE.md 파일을 생성하면 Claude Code에게 프로젝트의 컨텍스트를 전달할 수 있습니다. 기술 스택, 코드 컨벤션, 디렉토리 구조 등을 명시하면 더 정확한 코드를 생성합니다.</p><p class="docs-p">프로젝트 루트에 CLAUDE.md 파일을 생성하면 Claude Code에게 프로젝트의 컨텍스트를 전달할 수 있습니다. 기술 스택, 코드 컨벤션, 디렉토리 구조 등을 명시하면 더 정확한 코드를 생성합니다.</p><p class="docs-p">프로젝트 루트에 CLAUDE.md 파일을 생성하면 Claude Code에게 프로젝트의 컨텍스트를 전달할 수 있습니다. 기술 스택, 코드 컨벤션, 디렉토리 구조 등을 명시하면 더 정확한 코드를 생성합니다.</p><p class="docs-p">프로젝트 루트에 CLAUDE.md 파일을 생성하면 Claude Code에게 프로젝트의 컨텍스트를 전달할 수 있습니다. 기술 스택, 코드 컨벤션, 디렉토리 구조 등을 명시하면 더 정확한 코드를 생성합니다.</p><p class="docs-p">프로젝트 루트에 CLAUDE.md 파일을 생성하면 Claude Code에게 프로젝트의 컨텍스트를 전달할 수 있습니다. 기술 스택, 코드 컨벤션, 디렉토리 구조 등을 명시하면 더 정확한 코드를 생성합니다.</p><p class="docs-p">프로젝트 루트에 CLAUDE.md 파일을 생성하면 Claude Code에게 프로젝트의 컨텍스트를 전달할 수 있습니다. 기술 스택, 코드 컨벤션, 디렉토리 구조 등을 명시하면 더 정확한 코드를 생성합니다.</p><p class="docs-p">프로젝트 루트에 CLAUDE.md 파일을 생성하면 Claude Code에게 프로젝트의 컨텍스트를 전달할 수 있습니다. 기술 스택, 코드 컨벤션, 디렉토리 구조 등을 명시하면 더 정확한 코드를 생성합니다.</p><p class="docs-p">프로젝트 루트에 CLAUDE.md 파일을 생성하면 Claude Code에게 프로젝트의 컨텍스트를 전달할 수 있습니다. 기술 스택, 코드 컨벤션, 디렉토리 구조 등을 명시하면 더 정확한 코드를 생성합니다.</p><p class="docs-p">프로젝트 루트에 CLAUDE.md 파일을 생성하면 Claude Code에게 프로젝트의 컨텍스트를 전달할 수 있습니다. 기술 스택, 코드 컨벤션, 디렉토리 구조 등을 명시하면 더 정확한 코드를 생성합니다.</p><p class="docs-p">프로젝트 루트에 CLAUDE.md 파일을 생성하면 Claude Code에게 프로젝트의 컨텍스트를 전달할 수 있습니다. 기술 스택, 코드 컨벤션, 디렉토리 구조 등을 명시하면 더 정확한 코드를 생성합니다.</p><p class="docs-p">프로젝트 루트에 CLAUDE.md 파일을 생성하면 Claude Code에게 프로젝트의 컨텍스트를 전달할 수 있습니다. 기술 스택, 코드 컨벤션, 디렉토리 구조 등을 명시하면 더 정확한 코드를 생성합니다.</p><p class="docs-p">프로젝트 루트에 CLAUDE.md 파일을 생성하면 Claude Code에게 프로젝트의 컨텍스트를 전달할 수 있습니다. 기술 스택, 코드 컨벤션, 디렉토리 구조 등을 명시하면 더 정확한 코드를 생성합니다.</p><p class="docs-p">프로젝트 루트에 CLAUDE.md 파일을 생성하면 Claude Code에게 프로젝트의 컨텍스트를 전달할 수 있습니다. 기술 스택, 코드 컨벤션, 디렉토리 구조 등을 명시하면 더 정확한 코드를 생성합니다.</p><p class="docs-p">프로젝트 루트에 CLAUDE.md 파일을 생성하면 Claude Code에게 프로젝트의 컨텍스트를 전달할 수 있습니다. 기술 스택, 코드 컨벤션, 디렉토리 구조 등을 명시하면 더 정확한 코드를 생성합니다.</p><p class="docs-p">프로젝트 루트에 CLAUDE.md 파일을 생성하면 Claude Code에게 프로젝트의 컨텍스트를 전달할 수 있습니다. 기술 스택, 코드 컨벤션, 디렉토리 구조 등을 명시하면 더 정확한 코드를 생성합니다.</p><p class="docs-p">프로젝트 루트에 CLAUDE.md 파일을 생성하면 Claude Code에게 프로젝트의 컨텍스트를 전달할 수 있습니다. 기술 스택, 코드 컨벤션, 디렉토리 구조 등을 명시하면 더 정확한 코드를 생성합니다.</p><p class="docs-p">프로젝트 루트에 CLAUDE.md 파일을 생성하면 Claude Code에게 프로젝트의 컨텍스트를 전달할 수 있습니다. 기술 스택, 코드 컨벤션, 디렉토리 구조 등을 명시하면 더 정확한 코드를 생성합니다.</p><p class="docs-p">프로젝트 루트에 CLAUDE.md 파일을 생성하면 Claude Code에게 프로젝트의 컨텍스트를 전달할 수 있습니다. 기술 스택, 코드 컨벤션, 디렉토리 구조 등을 명시하면 더 정확한 코드를 생성합니다.</p>
기술 스택: TypeScript, React, Tailwind
패키지 매니저: Bun</code></pre>
    `,
  },
};

const FALLBACK_DOC: DocContent = {
  slug: '',
  title: '문서를 찾을 수 없습니다',
  category: '',
  breadcrumb: 'Docs',
  sections: [],
  html: '<p class="docs-p">요청하신 문서가 존재하지 않습니다.</p>',
};

export class DocsDetailPage {
  private root: HTMLElement;
  private slug: string;

  constructor(root: HTMLElement, slug: string) {
    this.root = root;
    this.slug = slug;
  }

  render(): void {
    this.root.innerHTML = `<main><h1>Doc: ${this.slug}</h1></main>`;
  }
}
