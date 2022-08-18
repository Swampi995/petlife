import {
    getAuth, FacebookAuthProvider, signInWithEmailAndPassword,
    signInWithCredential, createUserWithEmailAndPassword,
} from 'firebase/auth';
import { getFirestore, addDoc, collection } from 'firebase/firestore';
import * as Facebook from 'expo-facebook';
import { Callback } from '../';

const auth = getAuth();
const db = getFirestore();

export async function signIn(email: string, password: string, callback: Callback) {
    await signInWithEmailAndPassword(auth, email, password).then(() => {
        callback('success', 'Login successful');
    }).catch((error) => {
        callback('error', error.message)
    });
}

export async function signOut() {
    await auth.signOut();
}

export async function registerAccount(name: string, email: string, password: string, callback: Callback) {
    await createUserWithEmailAndPassword(auth, email, password).then(() => {
        callback('success', 'Account created.');
    }).catch((error) => {
        callback('error', error.message);
    });

    await addDoc(collection(db, 'users'), {
        name,
        email: auth.currentUser?.email,
    });
}

export async function loginWithFacebook() {
    await Facebook.initializeAsync('<FACEBOOK_APP_ID>');

    const facebook = await Facebook.logInWithReadPermissionsAsync({
        permissions: ['public_profile', 'email'],
    });

    if (facebook.type === 'success') {
        // Build Firebase credential with the Facebook access token.
        const credential = FacebookAuthProvider.credential(facebook.token);

        // Sign in with credential from the Facebook user.
        signInWithCredential(auth, credential).catch(error => {
            // Handle Errors here.
        });
    }
}