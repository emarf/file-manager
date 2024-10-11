import fs from 'node:fs';
import path from 'node:path';

export const initCatCommand = (args) => {
  try {
    if (!args || args.length === 0) {
      console.log('Invalid input');
      return;
    }

    const filePath = path.resolve(args[0]);
    const readableStream = fs.createReadStream(filePath, { encoding: 'utf-8' });

    readableStream.on('data', (chunk) => {
      console.log(chunk);
    });

    readableStream.on('error', () => {
      console.log('Operation failed');
    })

  } catch (error) {
    console.error(error);
    console.log('Operation failed');
  }
}