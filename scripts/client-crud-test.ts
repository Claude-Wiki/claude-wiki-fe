import * as dotenv from 'dotenv';
dotenv.config();

import { initializeApp, getApps } from 'firebase/app';
import {
  getFirestore,
  connectFirestoreEmulator,
  collection,
  doc,
  runTransaction,
  getDoc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
} from 'firebase/firestore';
import {
  getAuth,
  signInWithEmailAndPassword,
  connectAuthEmulator,
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

if (process.env.NODE_ENV === 'development') {
  connectFirestoreEmulator(db, '127.0.0.1', 8080);
  connectAuthEmulator(auth, 'http://127.0.0.1:9099');
}

const TEST_SLUG = 'client-crud-test-post';

async function testCreate(): Promise<string> {
  console.log('\n[1/4] CREATE — posts 컬렉션에 문서 추가');

  const slugRef = doc(db, 'slugs', TEST_SLUG);
  const postRef = doc(collection(db, 'posts'));

  await runTransaction(db, async (tx) => {
    const slugSnap = await tx.get(slugRef);
    if (slugSnap.exists()) tx.delete(slugRef);
    tx.set(slugRef, { postId: postRef.id });
    tx.set(postRef, {
      title: '클라이언트 CRUD 테스트 포스트',
      content: '클라이언트 SDK 테스트용 본문입니다.',
      slug: TEST_SLUG,
      category: 'test',
      tags: ['client', 'firebase'],
      author: { uid: 'test-uid-0000', displayName: '테스트 유저' },
      published: false,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
  });

  console.log(`  -> 생성 성공: id=${postRef.id}`);
  return postRef.id;
}

async function testRead(id: string): Promise<void> {
  console.log('\n[2/4] READ — 문서 조회');

  const snap = await getDoc(doc(db, 'posts', id));
  if (!snap.exists()) throw new Error(`문서를 찾을 수 없음: ${id}`);

  const data = snap.data();
  console.log(`  -> title    : ${data.title}`);
  console.log(`  -> slug     : ${data.slug}`);
  console.log(`  -> published: ${data.published}`);
}

async function testUpdate(id: string): Promise<void> {
  console.log('\n[3/4] UPDATE — published: true 로 변경');

  await updateDoc(doc(db, 'posts', id), {
    title: '클라이언트 CRUD 테스트 포스트 (수정됨)',
    published: true,
    updatedAt: serverTimestamp(),
  });

  const snap = await getDoc(doc(db, 'posts', id));
  const data = snap.data()!;
  console.log(`  -> title    : ${data.title}`);
  console.log(`  -> published: ${data.published}`);
}

async function testDelete(id: string): Promise<void> {
  console.log('\n[4/4] DELETE — posts + slugs 문서 삭제');

  await deleteDoc(doc(db, 'posts', id));
  await deleteDoc(doc(db, 'slugs', TEST_SLUG));

  const snap = await getDoc(doc(db, 'posts', id));
  if (snap.exists()) throw new Error('삭제 실패: 문서가 아직 존재함');

  console.log('  -> 삭제 성공');
}

async function main() {
  console.log('=== Firebase Client SDK CRUD 테스트 시작 ===');
  console.log(`환경: ${process.env.NODE_ENV === 'development' ? '에뮬레이터 (127.0.0.1:8080)' : '실제 Firebase (주의!)'}`);
  console.log(`프로젝트: ${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}`);

  // 어드민 로그인
  const email = process.env.TEST_ADMIN_EMAIL!;
  const password = process.env.TEST_ADMIN_PASSWORD!;
  console.log(`\n[AUTH] ${email} 로그인 중...`);
  await signInWithEmailAndPassword(auth, email, password);
  console.log('  -> 로그인 성공');

  const id = await testCreate();
  await testRead(id);
  await testUpdate(id);
  await testDelete(id);

  console.log('\n=== 모든 테스트 통과 ===\n');
  process.exit(0);
}

main().catch((err) => {
  console.error('\n[FAIL]', err.message ?? err);
  process.exit(1);
});
