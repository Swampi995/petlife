import { auth } from '../../config/firebase';
import { addDoc, limit, serverTimestamp, query } from 'firebase/firestore';
import { getCollection } from '../firebase';

const postsCollection = getCollection('posts');

export const postsQuery = query(postsCollection, limit(20));

export function addPost(message: string) {
    return addDoc(postsCollection, {
        message,
        created: serverTimestamp(),
        sender: auth.currentUser,
    });
};