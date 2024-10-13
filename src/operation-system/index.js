import os from 'node:os';
import { checkArgs } from '../helpers.js';

const osInfoMap = new Map([
  ['--EOL', () => {
    console.log(`Your operating system EOL is: ${JSON.stringify(os.EOL)}`);
  }],
  ['--cpus', () => {
    const cpus = os.cpus();
    const cpuTable = cpus.map((cpu) => ({
      'Model': cpu.model,
      'Clock rate': `${cpu.speed / 1000} GHz`,
    }));
    console.log('Total number of CPUs:', cpus.length);
    console.table(cpuTable);
  }],
  ['--homedir', () => {
    console.log(`Your home directory is: ${JSON.stringify(os.homedir())}`);
  }],
  ['--username', () => {
    console.log(`Your username is: ${JSON.stringify(os.userInfo().username)}`);
  }],
  ['--architecture', () => {
    console.log(`Your architecture is: ${JSON.stringify(os.arch())}`);
  }]
]);

export const getOsInfo = (arg) => {
  if (!checkArgs(arg)) {
    return;
  }

  const handler = osInfoMap.get(arg);

  if (handler) {
    handler();
  } else {
    console.log('Invalid input');
  }
}