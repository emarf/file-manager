import fs from 'node:fs';
import fsPromises from 'node:fs/promises';
import path from 'node:path';
import { pipeline } from 'node:stream/promises';
import zlib from 'node:zlib';
import { checkArgs } from '../helpers.js';
import { logErrorMessage } from '../logger.js';

export const initCompress = async (args) => {
  try {
    if (!checkArgs(args)) {
      return;
    }

    const [filePath, destDir] = args;

    const stats = await fsPromises.stat(filePath).catch(() => null);
    if (!stats || !stats.isFile()) {
      throw new Error('File does not exist');
    }

    const readableStream = fs.createReadStream(filePath);
    const writableStream = fs.createWriteStream(`${destDir}/${path.basename(filePath)}.br`);
    const brotli = zlib.createBrotliCompress();

    await pipeline(readableStream, brotli, writableStream);
  } catch (error) {
    logErrorMessage(error);
  }
};