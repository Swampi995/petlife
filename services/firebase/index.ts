import { getFirestore, CollectionReference, collection } from 'firebase/firestore';
import { firebase } from '../../config/firebase';
import { DBFirestore } from './types';

const firestore = getFirestore(firebase);

export const getCollection = <K extends keyof DBFirestore>(collectionName: K) => {
    return collection(firestore, collectionName) as CollectionReference<DBFirestore[K]>
}