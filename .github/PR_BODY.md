- #25

Firebase Client SDK를 프로젝트에 연결하여 이후 Firestore/Auth 를 사용할 수 있는 기반을 마련하였습니다.

## 주요 변경사항

### Firebase Client SDK 초기화

`src/shared/lib/firebase/client.ts` 를 추가하여 Firebase 앱, Firestore, Auth 인스턴스를 단일 진입점에서 제공하도록 하였습니다.
`getApps()` 로 중복 초기화를 방지하여 HMR 환경에서도 안전하게 재사용되도록 하였고, `import.meta.env.DEV` 가 참이고 최초 초기화 시점일 때만 Firestore(127.0.0.1:8080)·Auth(127.0.0.1:9099) 에뮬레이터에 연결하도록 구현하였습니다.

### Vite 환경변수 및 타입 정비

Vite 규칙에 맞춰 환경변수 접두사를 `VITE_FIREBASE_*` 로 통일하고 `import.meta.env` 를 통해 접근하도록 변경하였습니다.
`src/vite-env.d.ts` 에 `ImportMetaEnv` 타입을 선언하여 환경변수 접근 시 타입 자동완성과 오타 검증이 가능하도록 하였으며, `.env.example` 도 이에 맞게 갱신하였습니다.

### 패키지 매니저 일원화

본 프로젝트의 패키지 매니저는 Bun 이므로 `package-lock.json` 의 Git 추적을 해제하고 `.gitignore` 에 `package-lock.json`, `yarn.lock` 을 추가하여 락파일이 `bun.lock` 하나로만 관리되도록 하였습니다.

### 연결 가이드 문서 갱신

`.claude/context/connect.md` 를 현재 Vite/`src/shared/lib` 구조에 맞게 정리하였습니다. 에뮬레이터 실행 및 CRUD 테스트 안내에서 백엔드 레포 경로를 실제 레포명(`claude-wiki-be`)으로 수정하였습니다.

## 리뷰 주의사항

- 본 PR 은 셋업 전용이며 `client.ts` 를 실제로 import 하는 사용처는 아직 없습니다. 타입 체크(`tsc --noEmit`) 기준으로만 동작을 검증하였고, 실제 연결 검증은 다음 기능 PR 에서 자연스럽게 이루어질 예정입니다.
- 로컬 실행을 위해서는 `.env` 파일을 직접 생성해야 합니다. 실제 키 값은 별도로 공유드립니다.
- `vite.config.ts` 의 `historyApiFallback` 타입 에러는 `dev` 브랜치에도 존재하는 기존 이슈이며 본 PR 의 범위 밖이라 건드리지 않았습니다.

close #25
