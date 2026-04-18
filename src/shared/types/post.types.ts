import type { Timestamp } from 'firebase/firestore';

export interface Post {
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
