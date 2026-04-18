# Firebase 연결 가이드

## 기술 스택

- Firebase Client SDK (`firebase` 패키지)
- Firestore (DB), Auth (인증)
- 로컬 개발: Firebase 에뮬레이터 (Firestore `127.0.0.1:8080`, Auth `127.0.0.1:9099`)
- 빌드 도구: **Vite** — 환경변수는 `VITE_` 접두사 + `import.meta.env` 로 접근

---

## 초기화 (`src/shared/lib/firebase/client.ts`)

```typescript
import { initializeApp, getApps } from 'firebase/app';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { getAuth, connectAuthEmulator } from 'firebase/auth';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const isFirstInit = getApps().length === 0;
const app = isFirstInit ? initializeApp(firebaseConfig) : getApps()[0];

export const db = getFirestore(app);
export const auth = getAuth(app);

if (import.meta.env.DEV && isFirstInit) {
  connectFirestoreEmulator(db, '127.0.0.1', 8080);
  connectAuthEmulator(auth, 'http://127.0.0.1:9099');
}
```

- `getApps()` 로 중복 초기화 방지 (HMR 대비)
- 에뮬레이터 연결은 최초 초기화 시점에만 실행 (dev 모드 한정)

---

## 환경변수 (`.env` — 커밋 금지)

```
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
```

- 템플릿: `.env.example`
- Vite 는 기본적으로 `VITE_` 접두사가 있는 변수만 클라이언트 번들에 노출
- `.env` 는 `.gitignore` 에 포함되어 있음

---

## 타입 선언 (`src/vite-env.d.ts`)

```typescript
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_FIREBASE_API_KEY: string;
  readonly VITE_FIREBASE_AUTH_DOMAIN: string;
  readonly VITE_FIREBASE_PROJECT_ID: string;
  readonly VITE_FIREBASE_STORAGE_BUCKET: string;
  readonly VITE_FIREBASE_MESSAGING_SENDER_ID: string;
  readonly VITE_FIREBASE_APP_ID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
```

---

## 에뮬레이터 실행

```bash
cd ../claude-wiki-be
npm run emulator   # http://127.0.0.1:4000 에서 UI 확인 가능
```

> 프론트엔드 `bun run dev` 를 먼저 실행하면 에뮬레이터 미기동 상태라 `connect*Emulator` 호출이 WebSocket 연결 시도하면서 콘솔 경고가 뜰 수 있음. 개발 중엔 에뮬레이터 먼저 띄우고 프론트를 켠다.

---

## 어드민 권한 확인 (클라이언트)

```typescript
import { auth } from '@/shared/lib/firebase/client';

export const checkIsAdmin = async (): Promise<boolean> => {
  const user = auth.currentUser;
  if (!user) return false;
  const token = await user.getIdTokenResult(true); // 강제 갱신
  return token.claims.is_admin === true;
};
```

> Custom Claim `is_admin: true` 는 백엔드(`claude-wiki-be`)에서 `npm run set-admin` 으로 부여.

---

## 어드민 로그인 (이메일/비밀번호)

```typescript
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/shared/lib/firebase/client';

await signInWithEmailAndPassword(auth, email, password);
```

로그인 후 Firestore 쓰기 요청 시 `is_admin: true` Custom Claim 이 자동으로 포함되어 Security Rules 를 통과한다.

---

## CRUD 테스트

백엔드 레포(`claude-wiki-be`)의 `scripts/client-crud-test.ts` 를 통해 실제 Firebase / 에뮬레이터 대상 CRUD 전체 흐름을 검증한다.

```bash
cd ../claude-wiki-be
npm run crud-test      # 실제 Firebase
npm run crud-test:dev  # 로컬 에뮬레이터
```

> 테스트 계정 정보는 `.env` 의 `TEST_ADMIN_EMAIL`, `TEST_ADMIN_PASSWORD` 로 관리 (커밋 금지).
