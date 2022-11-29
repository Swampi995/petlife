export * from './users';
export * from './posts';

export type Callback = (type: 'success' | 'error', message?: string) => void;