import fs from 'node:fs/promises';
import path from 'node:path';
import { checkArgs, getCurrentWorkingDirectory } from '../helpers.js';
import { logErrorMessage } from '../logger.js';

export const initRn = async (args) => {
  try {
    if (!checkArgs(args)) {
      return;
    }

    const [filePath, newName] = args;

    const resolvedPath = path.isAbsolute(filePath) ? filePath : path.resolve(getCurrentWorkingDirectory(), filePath);
    const directory = path.dirname(resolvedPath);
    const resolvedNewName = path.resolve(directory, newName);
    const stats = await fs.stat(resolvedPath);

    if (stats.isDirectory()) {
      throw new Error('Cannot rename a directory');
    }

    await fs.rename(resolvedPath, resolvedNewName);
  } catch (error) {
    logErrorMessage(error);
  }
}