import fs from 'node:fs';
import fsPromises from 'node:fs/promises';
import path from 'node:path';
import { pipeline } from 'stream/promises';
import { checkArgs } from '../helpers.js';
import { logErrorMessage } from '../logger.js';

export const initMv = async (args) => {
  try {
    if (!checkArgs(args)) {
      return;
    }

    const [filePath, destDir] = args;

    const fileName = path.basename(filePath);
    const destFilePath = path.join(destDir, fileName);

    const hasAccess = await fsPromises.access(filePath).then(() => true).catch(() => false);
    if (!hasAccess) {
      throw new Error('File does not exist');
    }

    const readableStream = fs.createReadStream(filePath);
    const writableStream = fs.createWriteStream(destFilePath);

    await pipeline(readableStream, writableStream);
    await fsPromises.unlink(filePath);
  } catch (error) {
    logErrorMessage(error)
  }
}