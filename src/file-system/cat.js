import fs from 'node:fs';
import path from 'node:path';
import { logErrorMessage } from '../logger.js';
import { checkArgs } from '../helpers.js';

export const initCat = async (args) => {
  try {
    if (!checkArgs(args)) {
      return;
    }

    const [filePath] = args;
    const resolvedPath = path.resolve(filePath);
    const readableStream = fs.createReadStream(resolvedPath);

    readableStream.on('data', (chunk) => {
      console.log(chunk.toString());
    });

    readableStream.on('error', (error) => {
      logErrorMessage(error);
    });
  } catch (error) {
    logErrorMessage(error);
  }
}