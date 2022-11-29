import { DocumentReference } from 'firebase/firestore';

export interface POST {
    sender: DocumentReference<USER>;
    created: Date;
    message?: string;
    imageUrl?: string;
}

export interface USER {
    email: string;
    name: string;
    id: string;
}

export interface DBFirestore {
    posts: POST;
    users: USER;
}