# API 명세

Firebase Firestore를 직접 사용하는 클라이언트 SDK 기반 API.
별도 REST 서버 없음 — Firestore 쿼리 + Security Rules로 접근 제어.

---

## 컬렉션 구조

### `posts`

| 필드 | 타입 | 설명 |
|------|------|------|
| `id` | `string` | Firestore 문서 ID (자동 생성) |
| `postType` | `'blog' \| 'docs'` | 글 유형 — blog: 블로그, docs: 위키 문서 |
| `title` | `string` | 제목 |
| `content` | `string` | 본문 (마크다운) |
| `slug` | `string` | URL용 고유 식별자 (`/docs/:slug`, `/blog/:slug`) |
| `category` | `string` | 카테고리 |
| `tags` | `string[]` | 태그 목록 |
| `author.uid` | `string` | 작성자 UID |
| `author.displayName` | `string` | 작성자 표시 이름 |
| `published` | `boolean` | `false` = 초안(어드민만), `true` = 공개 |
| `createdAt` | `Timestamp` | 생성 시각 |
| `updatedAt` | `Timestamp` | 수정 시각 |

### `slugs` (sentinel)

slug 유일성 보장용. `{ postId: string }` 구조.
`posts` 문서와 transaction으로 함께 생성/삭제.

---

## 타입 정의

```typescript
import { Timestamp } from 'firebase/firestore';

type PostType = 'blog' | 'docs';

interface Post {
  id: string;
  postType: PostType;
  title: string;
  content: string;
  slug: string;
  category: string;
  tags: string[];
  author: {
    uid: string;
    displayName: string;
  };
  published: boolean;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
```

---

## 쿼리 패턴

### 블로그 글 목록 조회

```typescript
query(
  collection(db, 'posts'),
  where('published', '==', true),
  where('postType', '==', 'blog'),
  orderBy('createdAt', 'desc'),
  limit(12)
)
```

### Docs 목록 조회 (사이드바 트리용)

```typescript
query(
  collection(db, 'posts'),
  where('published', '==', true),
  where('postType', '==', 'docs'),
  orderBy('category', 'asc'),
  orderBy('createdAt', 'asc')
)
```

### slug로 단건 조회

```typescript
query(collection(db, 'posts'), where('slug', '==', slug), where('published', '==', true))
```

### 글 작성 (어드민 전용)

slug sentinel과 함께 transaction으로 생성. `postRepository.create(input)` 사용.

### 글 수정 (어드민 전용)

slug 변경 시 sentinel 교체. `postRepository.update(id, input)` 사용.

### 글 삭제 (어드민 전용)

post + slug sentinel 동시 삭제. `postRepository.delete(id)` 사용.

---

## Security Rules 요약

| 작업 | 조건 |
|------|------|
| `posts` 읽기 (published) | 누구나 |
| `posts` 읽기 (미발행) | `is_admin: true` |
| `posts` 쓰기/수정/삭제 | `is_admin: true` |
| `slugs` 읽기/쓰기 | `is_admin: true` |

> 전체 Rules는 `asd/firestore.rules` 참고.
