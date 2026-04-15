# Firebase 연결 가이드

## 기술 스택

- Firebase Client SDK (`firebase` 패키지)
- Firestore (DB), Auth (인증)
- 로컬 개발: Firebase 에뮬레이터 (Firestore :8080, Auth :9099)

---

## 초기화 (`src/lib/firebase/client.ts`)

```typescript
import { initializeApp, getApps } from 'firebase/app';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { getAuth, connectAuthEmulator } from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

if (process.env.NODE_ENV === 'development') {
  connectFirestoreEmulator(db, '127.0.0.1', 8080);
  connectAuthEmulator(auth, 'http://127.0.0.1:9099');
}
```

---

## 환경변수 (`.env.local`)

```
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
```

> `.env.example` 참고. `NEXT_PUBLIC_` 접두사가 없으면 클라이언트에서 읽을 수 없음.

---

## 에뮬레이터 실행

```bash
cd ../asd
npm run emulator   # http://127.0.0.1:4000 에서 UI 확인 가능
```

---

## 어드민 권한 확인 (클라이언트)

```typescript
import { getAuth } from 'firebase/auth';

export const checkIsAdmin = async (): Promise<boolean> => {
  const user = getAuth().currentUser;
  if (!user) return false;
  const token = await user.getIdTokenResult(true); // 강제 갱신
  return token.claims.is_admin === true;
};
```

> Custom Claim `is_admin: true` 는 백엔드(`asd/`)에서 `npm run set-admin` 으로 부여.
