import readline from 'readline';
import os from 'os';
import { initCdCommand } from './src/basicCommands/cdCommand.js';
import { initLsCommand } from './src/basicCommands/lsCommand.js';

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

const commands = ['.exit', 'up', 'cd', 'ls']

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

  console.log(`You are currently in ${getCurrentWorkingDirectory()}`);
});


rl.on('close', () => {
  exitProcess();
})

