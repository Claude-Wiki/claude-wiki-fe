# API 명세

Firebase Firestore를 직접 사용하는 클라이언트 SDK 기반 API.
별도 REST 서버 없음 — Firestore 쿼리 + Security Rules로 접근 제어.

---

## 컬렉션 구조

### `posts`

| 필드 | 타입 | 설명 |
|------|------|------|
| `id` | `string` | Firestore 문서 ID (자동 생성) |
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

### `posts/{postId}/history` (서브컬렉션)

어드민이 포스트를 수정할 때마다 **수정 직전 상태**를 스냅샷으로 저장.
어드민 대시보드에서만 조회 가능 (유저에게 노출 안 함).

| 필드 | 타입 | 설명 |
|------|------|------|
| `id` | `string` | Firestore 문서 ID (자동 생성) |
| `title` | `string` | 수정 전 제목 스냅샷 |
| `content` | `string` | 수정 전 본문 스냅샷 |
| `slug` | `string` | 수정 전 slug 스냅샷 |
| `category` | `string` | 수정 전 카테고리 스냅샷 |
| `tags` | `string[]` | 수정 전 태그 스냅샷 |
| `author` | `PostAuthor` | 원본 작성자 |
| `published` | `boolean` | 수정 전 발행 상태 |
| `editedBy` | `PostAuthor` | 이 편집을 수행한 어드민 |
| `editedAt` | `Timestamp` | 편집 시각 |

---

## 타입 정의

```typescript
import { Timestamp } from 'firebase/firestore';

interface Post {
  id: string;
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

### 공개 글 목록 조회

```typescript
import { collection, query, where, orderBy, limit, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase/client';

const getPublishedPosts = async (pageSize = 10): Promise<Post[]> => {
  const q = query(
    collection(db, 'posts'),
    where('published', '==', true),
    orderBy('createdAt', 'desc'),
    limit(pageSize)
  );
  const snap = await getDocs(q);
  return snap.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Post[];
};
```

### slug로 단건 조회

```typescript
import { collection, query, where, getDocs } from 'firebase/firestore';

const getPostBySlug = async (slug: string): Promise<Post> => {
  const q = query(collection(db, 'posts'), where('slug', '==', slug));
  const snap = await getDocs(q);
  if (snap.empty) throw new Error('Post not found');
  const doc = snap.docs[0];
  return { id: doc.id, ...doc.data() } as Post;
};
```

### 글 작성 (어드민 전용)

```typescript
import { collection, doc, runTransaction, serverTimestamp } from 'firebase/firestore';

const createPost = async (data: Omit<Post, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> => {
  const slugRef = doc(db, 'slugs', data.slug);
  const postRef = doc(collection(db, 'posts'));

  await runTransaction(db, async (tx) => {
    const slugSnap = await tx.get(slugRef);
    if (slugSnap.exists()) throw new Error(`Slug "${data.slug}" already exists`);
    tx.set(slugRef, { postId: postRef.id });
    tx.set(postRef, { ...data, createdAt: serverTimestamp(), updatedAt: serverTimestamp() });
  });

  return postRef.id;
};
```

### 글 수정 (어드민 전용)

```typescript
import { doc, updateDoc, serverTimestamp } from 'firebase/firestore';

const updatePost = async (id: string, data: Partial<Post>): Promise<void> => {
  await updateDoc(doc(db, 'posts', id), { ...data, updatedAt: serverTimestamp() });
};
```

### 글 삭제 (어드민 전용)

```typescript
import { doc, deleteDoc } from 'firebase/firestore';

const deletePost = async (id: string, slug: string): Promise<void> => {
  await deleteDoc(doc(db, 'posts', id));
  await deleteDoc(doc(db, 'slugs', slug));
};
```

---

## Security Rules 요약

| 작업 | 조건 |
|------|------|
| `posts` 읽기 (published) | 누구나 |
| `posts` 읽기 (미발행) | `is_admin: true` |
| `posts` 쓰기/수정/삭제 | `is_admin: true` |
| `slugs` 읽기/쓰기 | `is_admin: true` |

> 전체 Rules는 `asd/firestore.rules` 참고.
