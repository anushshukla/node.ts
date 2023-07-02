import { Config } from '@jest/types';

export default async function getJestConfig(): Promise<Config.InitialOptions> {
  return {
    moduleFileExtensions: ["js", "json", "ts"],
    bail: 1,
    verbose: true,
    preset: 'ts-jest',
    // transform: {
    //   "^.+\\.(t|j)s$": "ts-jest"
    // },
    testEnvironment: "node",
    // testRegex: ".e2e-spec.ts$",
    testMatch: ['./**.ts'],
    testPathIgnorePatterns: ['/tests/constant.ts'],
    rootDir: './tests',
  };
}
