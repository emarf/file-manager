import fs from 'node:fs';
import path from 'node:path';
import { pipeline } from 'stream/promises';

export const initCpCommand = async (args) => {
  try {
    if (!args || args.length === 0) {
      console.log('Invalid input');
      return;
    }
    const [filePath, destDir] = args;

    const fileName = path.basename(filePath);
    const destFilePath = path.join(destDir, fileName);

    const readableStream = fs.createReadStream(filePath);
    const writableStream = fs.createWriteStream(destFilePath);

    await pipeline(readableStream, writableStream);
  } catch (error) {
    console.error(error);
    console.log('Operation failed')
  }
}  