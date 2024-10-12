import readline from 'node:readline';
import os from 'node:os';
import { initCdCommand } from './src/basicCommands/cdCommand.js';
import { initLsCommand } from './src/basicCommands/lsCommand.js';
import { initCatCommand } from './src/basicCommands/catCommand.js';
import { initAddCommand } from './src/basicCommands/addCommand.js';
import { initRnCommand } from './src/basicCommands/rnCommand.js';
import { initCpCommand } from './src/basicCommands/cpCommand.js';
import { initMvCommand } from './src/basicCommands/mvCommand.js';
import { initRmCommand } from './src/basicCommands/rmCommand.js';
import { getOsInfo } from './src/osCommands/os.js';
import { initHashCommand } from './src/hashCommand.js';

const getCurrentWorkingDirectory = () => {
  return process.cwd();
}

const argv = process.argv.slice(2);
const username = argv[0].split('=')[1];

process.chdir(os.homedir());
console.log(`Welcome to the File Manager, ${username}!`);
console.log(`You are currently in ${getCurrentWorkingDirectory()}`);
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });


const exitProcess = () => {
  console.log(`Thank you for using File Manager, ${username}, goodbye!`);
  process.exit();
}

const commands = ['.exit', 'up', 'cd', 'ls', 'cat', 'add', 'rn', 'cp', 'mv', 'rm', 'os', 'hash'];

rl.on('line', (input) => {
  const [command, ...args] = input.split(' ');

  if (!commands.includes(command)) {
    console.log('Invalid input');
    return;
  }

  if (command === '.exit') {
    exitProcess();
  }

  if (command === 'up') {
    process.chdir('..');
  }

  if (command === 'cd') {
    initCdCommand(args);
  }

  if (command === 'ls') {
    initLsCommand()
  }

  if (command === 'cat') {
    initCatCommand(args);
  }

  if (command === 'add') {
    initAddCommand(args);
  }

  if (command === 'rn') {
    initRnCommand(args);
  }

  if (command === 'cp') {
    initCpCommand(args);
  }

  if (command === 'mv') {
    initMvCommand(args);
  }

  if (command === 'rm') {
    initRmCommand(args);
  }

  if (command === 'os') {
    getOsInfo(args[0]);
  }

  if (command === 'hash') {
    initHashCommand(args);
  }

  console.log(`You are currently in ${getCurrentWorkingDirectory()}`);
});


rl.on('close', () => {
  exitProcess();
})

