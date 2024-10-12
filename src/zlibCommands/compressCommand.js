import zlib from 'node:zlib';
import fs from 'node:fs';
import path from 'node:path';
import { pipeline } from 'node:stream/promises';

export const initCompressCommand = async (args) => {
  try {
    if (!args || args.length === 0) {
      console.log('Invalid input');
      return;
    }
    const [filePath, destDir] = args;

    const readableStream = fs.createReadStream(filePath);
    const writableStream = fs.createWriteStream(`${destDir}/${path.basename(filePath)}.br`);
    const brotli = zlib.createBrotliCompress();

    await pipeline(readableStream, brotli, writableStream);

    console.log('Done compressing with Brotli')
  } catch (error) {
    console.error(error);
    console.log('Operation failed');
  }
};