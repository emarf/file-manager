import fs from 'node:fs/promises';

export const initRmCommand = async (args) => {
  try {
    if (!args || args.length === 0) {
      console.log('Invalid input');
      return;
    }
    const [filePath] = args;

    await fs.unlink(filePath);
  } catch (error) {
    console.error(error);
    console.log('Operation failed')
  }
}