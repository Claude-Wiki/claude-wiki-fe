# 아키텍처

## 전체 구조

```
claude-wiki-fe (프론트엔드)
  └─ Firebase Client SDK
       ├─ Firestore  ← 문서 데이터 (posts, slugs)
       └─ Auth       ← 어드민 인증 (Custom Claims)

asd / claude-wiki-be (백엔드 유틸)
  └─ Firebase Admin SDK
       └─ 어드민 계정 권한 부여 (set-admin)
```

별도 API 서버 없음. 프론트엔드가 Firestore에 직접 쿼리하고, Security Rules로 접근을 제어.

---

## 디렉토리 구조

```
src/
├── features/           # 도메인별 기능 모듈
│   ├── docs/           # 문서 탐색 및 상세
│   ├── blog/           # 블로그 목록 및 상세
│   ├── admin/          # 어드민 인증, 대시보드, 에디터
│   └── search/         # 전문 검색
├── shared/             # 공용 모듈
│   ├── components/     # 공통 UI 컴포넌트
│   ├── lib/
│   │   └── firebase/
│   │       └── client.ts   # Firebase 초기화
│   └── types/          # 공유 타입 정의
└── app/                # 라우팅 (Next.js App Router)
    ├── page.tsx            # / 메인
    ├── docs/
    │   ├── page.tsx        # /docs
    │   └── [slug]/page.tsx # /docs/:slug
    ├── blog/
    │   ├── page.tsx        # /blog
    │   └── [slug]/page.tsx # /blog/:slug
    └── admin/
        ├── page.tsx        # /admin (로그인)
        ├── dashboard/
        └── editor/
```

---

## 패턴

- **MVC** 기반으로 기능 분리
- `features/` 도메인 단위 + `shared/` 공용 분리
- Firebase 쿼리 로직은 `features/<domain>/` 안에 위치
- 컴포넌트는 UI만 담당, 데이터 패칭은 별도 함수로 분리

---

## 인증 흐름

```
/admin 진입
  └─ Firebase Auth 로그인
       └─ getIdTokenResult(true) → Custom Claim 확인
            ├─ is_admin: true  → 대시보드 접근 허용
            └─ is_admin: false → 접근 거부 (리다이렉트)
```

---

## 관련 문서

- [Firebase 연결 가이드](./connect.md)
- [API 명세](./api.md)
- [유저 시나리오](./scenario.md)
