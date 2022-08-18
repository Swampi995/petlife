export * from './users';

export type Callback = (type: 'success' | 'error', message?: string) => void;