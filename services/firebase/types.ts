import { User } from 'firebase/auth';

export interface POST {
    message: string;
    sender: User | null;
    created: Date;
}

export interface DBFirestore {
    posts: POST;
}