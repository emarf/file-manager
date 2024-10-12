import fs from 'node:fs/promises';
import { logErrorMessage } from '../logger.js';

const readTypes = {
  file: "file",
  directory: "directory",
};

export const initLs = async () => {
  try {
    const currentDirectory = process.cwd();
    const files = await fs.readdir(currentDirectory, { withFileTypes: true });
    const sortedFiles = files.sort((a, b) => {
      if (a.isDirectory() !== b.isDirectory()) {
        return a.isDirectory() ? -1 : 1;
      }
      return a.name.localeCompare(b.name);
    });

    const table = sortedFiles.map((file) => ({
      Name: file.name,
      Type: file.isDirectory() ? readTypes.directory : readTypes.file,
    }));

    console.table(table);
  } catch (error) {
    logErrorMessage(error);
  }
}