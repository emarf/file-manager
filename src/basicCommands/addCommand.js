import fs from 'node:fs/promises';
import path from 'node:path';

export const initAddCommand = async (args) => {
  try { 
    if (!args || args.length === 0) {
      console.log('Invalid input');
      return;
    } 

    const filePath = args[0];
    const resolvedPath = path.resolve(process.cwd(), filePath);
    await fs.writeFile(resolvedPath, '', { flag: 'wx' });
  } catch (error) {
    console.error(error);
    console.log('Operation failed')
  }
}