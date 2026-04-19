import {
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  type User,
} from 'firebase/auth';
import { auth } from '@/shared/lib/firebase/client';

export const signIn = (email: string, password: string): Promise<User> =>
  signInWithEmailAndPassword(auth, email, password).then(({ user }) => user);

export const signOut = (): Promise<void> => firebaseSignOut(auth);

export const checkIsAdmin = async (): Promise<boolean> => {
  const user = auth.currentUser;
  if (!user) return false;
  const token = await user.getIdTokenResult(true);
  return Boolean(token.claims['is_admin']);
};

export const subscribeAuthState = (callback: (user: User | null) => void): (() => void) =>
  onAuthStateChanged(auth, callback);
