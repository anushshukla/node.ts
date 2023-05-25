import { Config } from '@jest/types';

export default async (): Promise<Config.InitialOptions> => {
  return {
    bail: 1,
    verbose: true,
    preset: 'ts-jest',
    testMatch: ['./tests/**.ts'],
    rootDir: './tests',
  };
};
