# 프로젝트 컨벤션

프로젝트 전반에 적용되는 코드/구조/스타일 규칙. 기술 스택은 `CLAUDE.md` 참조, Git·PR·커밋 관련 규칙은 `git-flow.md` 참고.

---

## 1. 파일 및 폴더 구조

### 전체 구조
<!-- 이것은 내일 다시 정하는게 좋다 -->
- `features` (도메인 단위) + `shared` (공용 모듈) 기반으로 분리
- 폴더명은 `kebab-case`
- 파일 import 시 **절대 경로** 사용

### 타입·상수 파일 배치
- 파일이 **1개**일 때: 해당 폴더 바로 아래 위치
  - 예: `src/features/user/user.types.ts`
- 파일이 **2개 이상**일 때: `types/` 폴더 생성 후 분류
  - 예: `src/features/user/types/user.types.ts`, `src/features/user/types/address.types.ts`

### 파일명 네이밍
- **컴포넌트 파일**: `PascalCase` (예: `Button.tsx`)
- **유틸 파일**: `camelCase` (예: `formatDate.ts`)
- **타입 파일**: 확장자 앞에 `.types` (예: `user.types.ts`)
- **상수 파일**: 확장자 앞에 `.const` (예: `user.const.ts`)
- **테스트 파일**: 확장자 앞에 `.test` (예: `formatDate.test.ts`, `Button.test.tsx`)
- **테스트 폴더**: `__tests__`로 관리

---

## 2. 코드 네이밍

- **함수·변수**: `camelCase`
- **Boolean**: `is`로 시작 (예: `isOpen`)
- **배열**: `List`로 끝남 (예: `todoList`)
- **축약어**: 카멜케이스 적용 (`HTML` O / `Html` X)
- **핸들러 함수**: `handle`로 시작 (예: `handleClick`)
- **데이터 제어**
  - 불러오기: `get` 접두사
  - 클릭 등 핸들링: `handle` 접두사
- **상수**
  - 전역 상수: `SNAKE_CASE`
  - 함수 내부 지역 상수: `camelCase`

---

## 3. TypeScript 규칙

- **`any` 사용 절대 금지**. 타입 단언도 금지. 타입 추론을 최대한 활용.
  - 불가피한 경우에만 별도 타입 단언 전문가 AI 에이전트를 통해 판단.
- **인터페이스 접두사 `I` 사용 금지** (`IUser` X) — *(현재 보류 상태)*
- **타입 위치**
  - 단일 파일 전용: 해당 파일 내부에 작성
  - 공유 타입: 별도 파일로 분리
- **타입 명칭**: `PascalCase`
  - 컴포넌트 Props 타입: `<컴포넌트명>Props`

---

## 4. JavaScript 문법 규칙

- **클래스 비공개 필드**: `#` 대신 `private` 명시
- **배열 비구조화 할당**: 안 쓰는 변수는 `_`로 표시
  - `const [a, _, c] = arr` (O)
  - `const [a, , c] = arr` (X)
- **함수 선언**: `function` 키워드 대신 **화살표 함수** 사용
- **논리 흐름**: Early Return 적극 활용
- **외부 라이브러리**: 최근 2년 내 업데이트 안 된 버전 사용 지양 (Axios 등 포함)
- **메모리 누수 방지**
  - 이벤트 리스너, `IntersectionObserver` 부착 시 반드시 **cleanup** 처리
- **fetch 동시성 문제 해결 로직** 필수 구현

---

## 5. CSS 및 스타일링

- **단위**: `rem` 사용
- **색상**: 전역 스타일에 정의하고 호출해서 사용 (하드코딩 금지)
- **구현**: Tailwind CSS를 적절히 추상화하여 사용

---

## 관련 문서
- [Git & 커밋 규칙](./git-flow.md)
- [자동화 훅](../hooks/README.md)
