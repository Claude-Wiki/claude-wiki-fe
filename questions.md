# 팀원 논의 사항

## 미결 질문 목록

### Q1. 블로그 카테고리 관리 방식 — 고정 vs 동적

**맥락**: 현재 `#24` 구현에서 블로그 칩 필터의 카테고리를 프론트엔드 상수(`blogCategory.const.ts`)로 고정 관리.
이슈 #24 스펙과 디자인(3T3tQ) 모두 고정 목록(`전체`, `페어 프로그래밍`, `Claude Code`, 등 8개)으로 명시돼 있어 일단 그대로 구현 중.

**질문**: 카테고리를 추가/변경할 일이 생길 때 어떻게 관리할 것인가?

- **A. 현행 유지 (고정)** — 카테고리 변경 시 `blogCategory.const.ts` 수동 업데이트 + 배포
- **B. Firestore 동적 조회** — `categories` 컬렉션을 별도로 두고 FE 에서 조회 (어드민 CRUD 추가 필요)
- **C. 포스트 목록에서 클라이언트 집계** — 전체 포스트의 `category` 필드를 모아서 유니크 값으로 칩 구성 (비효율·쿼리 제한)

**관련 파일**: `src/domains/blog/list/blogCategory.const.ts`, `src/domains/blog/types/blog.types.ts`
