export interface POST {
    sender: string | undefined;
    created: Date;
    message?: string;
    imageUrl?: string;
}

export interface DBFirestore {
    posts: POST;
}