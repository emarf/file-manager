import fs from 'node:fs/promises';
import path from 'node:path';
import { checkArgs, getCurrentWorkingDirectory } from '../helpers.js';
import { logErrorMessage } from '../logger.js';

export const initAdd = async (args) => {
  try {
    if (!checkArgs(args)) {
      return;
    }
    const [filePath] = args;
    const currentDirectory = getCurrentWorkingDirectory();
    const resolvedPath = path.resolve(currentDirectory, filePath);
    await fs.writeFile(resolvedPath, '', { flag: 'wx' });
  } catch (error) {
    logErrorMessage(error);
  }
}