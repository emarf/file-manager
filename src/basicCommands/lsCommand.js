import fs from 'node:fs/promises';

const readTypes = {
  file: "file",
  directory: "directory",
};

export const initLsCommand = async () => {
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
    console.error(error);
    console.log('Operation failed')
  }
}