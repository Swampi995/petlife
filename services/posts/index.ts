import { auth } from '../../config/firebase';
import { limit, serverTimestamp, query } from 'firebase/firestore';
import { getCollection } from '../firebase';

export const postsCollection = getCollection('posts');
export const postsQuery = query(postsCollection, limit(20));

export function newPost(message: string) {
    return {
        message,
        created: serverTimestamp(),
        sender: auth.currentUser?.uid,
    }
};