import fs from 'node:fs/promises';
import { checkArgs } from '../helpers.js';
import { logErrorMessage } from '../logger.js';

export const initRm = async (args) => {
  try {
    if (!checkArgs(args)) {
      return;
    }
    
    const [filePath] = args;

    await fs.unlink(filePath);
  } catch (error) {
    logErrorMessage(error);
  }
}