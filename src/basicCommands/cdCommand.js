import path from 'node:path';

export const initCdCommand = (args) => {
  try {
    if (!args || args.length === 0) {
      console.log('Invalid input');
      return;
    }

    const dirPath = args[0];
    const absolutePath = path.isAbsolute(dirPath) ? dirPath : path.resolve(process.cwd(), dirPath);
    process.chdir(absolutePath);

  } catch (error) {
    console.error(error);
    console.log('Operation failed')
  }
}