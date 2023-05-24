import { Config } from '@jest/types';

// Or async function
export default async (): Promise<Config.InitialOptions> => {
  return {
    bail: 1,
    verbose: true,
    testMatch: ['./tests/**.ts'],
    rootDir: './tests',
  };
};
