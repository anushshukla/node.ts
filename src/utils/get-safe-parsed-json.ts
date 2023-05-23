export default function getSafeParsedJson<T>(string: string): [Error | null, T?] {
  try {
    return [null, JSON.parse(string)];
  } catch (error) {
    return [error as Error];
  }
};
