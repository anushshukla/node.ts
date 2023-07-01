import { Config } from '@jest/types';

export default async function getJestConfig(): Promise<Config.InitialOptions> {
  return {
    bail: 1,
    verbose: true,
    preset: 'ts-jest',
    testMatch: ['./**.ts'],
    testPathIgnorePatterns: ['/tests/constant.ts'],
    rootDir: './tests',
  };
}
