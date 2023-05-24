export type SafePromise<T> = [Error] | [null, T];

export default async function safePromise<T>(promise: Promise<T> | T): Promise<SafePromise<T>> {
  try {
    const result: T = await promise;
    return [null, result];
  } catch (error) {
    return [error as Error];
  }
}
