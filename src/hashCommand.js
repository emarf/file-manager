import fs from 'node:fs';
import crypto from 'crypto';
import path from 'node:path';

export const initHashCommand = (args) => {
  try {
    if (!args || args.length === 0) {
      console.log('Invalid input');
      return;
    }
    const [filePath] = args;

    const resolvedPath = path.isAbsolute(filePath) ? filePath : path.resolve(process.cwd(), filePath);

    const hash = crypto.createHash('sha256');

    const readableStream = fs.createReadStream(resolvedPath);

    readableStream.on('data', (chunk) => {
      hash.update(chunk);
    });

    readableStream.on('end', () => {
      console.log(hash.digest('hex'));
    });

  } catch (error) {
    console.error(error);
    console.log('Operation failed');
  }
};