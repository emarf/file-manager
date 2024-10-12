import fs from 'node:fs/promises';
import path from 'node:path';
import { logErrorMessage } from '../logger.js';

export const initAdd = async (args) => {
  try {
    if (!args || args.length === 0) {
      console.log('Invalid input');
      return;
    }

    const filePath = args[0];
    const resolvedPath = path.resolve(process.cwd(), filePath);
    await fs.writeFile(resolvedPath, '', { flag: 'wx' });
  } catch (error) {
    logErrorMessage(error);
  }
}