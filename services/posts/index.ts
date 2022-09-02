import { firebase, auth } from '../../config/firebase';
import { limit, serverTimestamp, query } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getCollection } from '../firebase';
import uuid from 'react-native-uuid';

export const postsCollection = getCollection('posts');
export const postsQuery = query(postsCollection, limit(20));

export function newPost(message?: string, imageUrl?: string) {
    return {
        created: serverTimestamp(),
        sender: auth.currentUser?.uid,
        ...(message && { message }),
        ...(imageUrl && { imageUrl }),
    }
};

export async function uploadImageAsync(uri: string) {
    // Why are we using XMLHttpRequest? See:
    // https://github.com/expo/expo/issues/2402#issuecomment-443726662
    const blob: any = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
            resolve(xhr.response);
        };
        xhr.onerror = function (e) {
            reject(new TypeError("Network request failed"));
        };
        xhr.responseType = "blob";
        xhr.open("GET", uri, true);
        xhr.send(null);
    });

    const fileRef = ref(getStorage(firebase), uuid.v4() as string);
    await uploadBytes(fileRef, blob);

    // We're done with the blob, close and release it
    blob.close();

    return getDownloadURL(fileRef);
}