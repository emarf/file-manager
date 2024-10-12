import fs from 'node:fs/promises';
import { logErrorMessage } from '../logger.js';

export const initRm = async (args) => {
  try {
    if (!args || args.length === 0) {
      console.log('Invalid input');
      return;
    }
    const [filePath] = args;

    await fs.unlink(filePath);
  } catch (error) {
    logErrorMessage(error);
  }
}