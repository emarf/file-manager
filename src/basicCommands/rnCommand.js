import fs from 'node:fs/promises';
import path from 'node:path';

export const initRnCommand = async (args) => {
  try {
    if (!args || args.length === 0) {
      console.log('Invalid input');
      return;
    }

    const [filePath, newName] = args;

    const resolvedPath = path.isAbsolute(filePath) ? filePath : path.resolve(process.cwd(), filePath);
    const directory = path.dirname(resolvedPath);
    const resolvedNewName = path.resolve(directory, newName);
    const stats = await fs.stat(resolvedPath);

    if (stats.isDirectory()) {
      throw error;
    }
    
    await fs.rename(resolvedPath, resolvedNewName);
  } catch (error) {
    console.error(error);
    console.log('Operation failed')
  }
}