import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';
import { pipeline } from 'node:stream/promises';

export const initDecompressCommand = async (args) => {
  try {
    if (!args || args.length === 0) {
      console.log('Invalid input');
      return;
    }
    const [filePath, destDir] = args;

    const readableStream = fs.createReadStream(filePath);
    const writableStream = fs.createWriteStream(`${destDir}/${path.basename(filePath, '.br')}`);
    const brotli = zlib.createBrotliDecompress();
    await pipeline(readableStream, brotli, writableStream);

  } catch (error) {
    console.error(error);
    console.log('Operation failed');
  }
}