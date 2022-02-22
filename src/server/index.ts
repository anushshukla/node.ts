import compression from 'compression';
import express from 'express';
import path from 'path';
import dotenv from 'dotenv';

// Load env from .env files.
const envInit = dotenv.config({
    path: path.resolve(
      __dirname,
      '../../.env'
    ),
    encoding: 'utf8'
  });
  
  if (envInit.error) {
    throw envInit.error;
  }

const app = express()

// @ToDo replace the below response compression by implementing reverse proxy
app.use(compression());

app.listen(3000, () => {
  console.log(`Application is running on port.`);
});