import os from 'node:os';

export const getOsInfo = (arg) => {
  if (!arg) {
    console.log('Invalid input');
    return;
  }

  if (arg === '--EOL') {
    console.log(`Your operation system EOL is: ${JSON.stringify(os.EOL)}`);
  }

  if (arg === '--cpus') {
    const table = os.cpus().map((cpu) => ({
      'Model': cpu.model,
      'Clock rate': `${cpu.speed / 1000} GHz`,
    }))
    console.log('Total number of CPUs:', os.cpus().length);
    console.table(table);
  }

  if (arg === '--homedir') {
    console.log(`Your home directory is: ${JSON.stringify(os.homedir())}`);
  }

  if (arg === '--username') {
    console.log(`Your username is: ${JSON.stringify(os.userInfo().username)}`);
  }

  if (arg === '--architecture') {
    console.log(`Your architecture is: ${JSON.stringify(os.arch())}`);
  }
}