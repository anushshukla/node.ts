export declare type SafePromise<T> = [Error] | [null, T];
export default function safePromise<T>(promise: Promise<T> | T): Promise<SafePromise<T>>;
