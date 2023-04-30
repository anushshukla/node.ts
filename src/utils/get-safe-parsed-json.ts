export default function getSafeParsedJson<T>(string: string): [Error | null, T | undefined] {
  try {
    return [null, JSON.parse(string)];
  } catch (error) {
    return [error];
  }
};
