import fs from 'node:fs';
import path from 'node:path';
import { pipeline } from 'node:stream/promises';
import { logErrorMessage } from '../logger.js';

export const initCat = async (args) => {
  try {
    if (!args || args.length === 0) {
      console.log('Invalid input');
      return;
    }
    const [filePath] = args;
    const resolvedPath = path.resolve(filePath);
    const readableStream = fs.createReadStream(resolvedPath);
    // !TODO check behavior of stdout
    await pipeline(readableStream, process.stdout);
  } catch (error) {
    logErrorMessage(error);
  }
}