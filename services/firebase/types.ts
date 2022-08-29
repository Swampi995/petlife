export interface POST {
    message: string;
    sender: string | undefined;
    created: Date;
}

export interface DBFirestore {
    posts: POST;
}