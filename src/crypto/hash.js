import crypto from 'crypto';
import fs from 'node:fs';
import path from 'node:path';
import { checkArgs } from '../helpers.js';
import { logErrorMessage } from '../logger.js';

export const initHash = (args) => {
  try {
    if (!checkArgs(args)) {
      return;
    }

    const [filePath] = args;
    const resolvedPath = path.isAbsolute(filePath) ? filePath : path.resolve(process.cwd(), filePath);

    const hash = crypto.createHash('sha256');
    const readableStream = fs.createReadStream(resolvedPath);

    readableStream.on('data', (chunk) => {
      hash.update(chunk);
    });

    readableStream.on('error', (error) => {
      logErrorMessage(error);
    });

    readableStream.on('end', () => {
      console.log(hash.digest('hex'));
    });

  } catch (error) {
    logErrorMessage(error);
  }
};