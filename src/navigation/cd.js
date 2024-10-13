import path from 'node:path';
import { checkArgs } from '../helpers.js';
import { logErrorMessage } from '../logger.js';

export const initCd = (args) => {
  try {
    if (!checkArgs(args)) {
      return;
    }

    const dirPath = args[0];
    const absolutePath = path.isAbsolute(dirPath) ? dirPath : path.resolve(process.cwd(), dirPath);
    process.chdir(absolutePath);
  } catch (error) {
    logErrorMessage(error);
  }
}