import dotenv, { DotenvConfigOutput } from 'dotenv';
import path from 'path';
let envInit: DotenvConfigOutput;

export default function initEnv(): void {
  if (envInit) {
    return;
  }
  envInit = dotenv.config({
    // @ToDo remove all .env files and path should to the git ignored .env file only
    path: path.resolve(__dirname, `../../.env`),
    encoding: 'utf8',
    debug: process.env.DEBUG === 'true',
  });

  if (envInit.error) {
    throw envInit.error;
  }
}
