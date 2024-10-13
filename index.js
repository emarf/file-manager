import os from 'node:os';
import readline from 'node:readline';
import { initHash } from './src/crypto/index.js';
import { initAdd, initCat, initCp, initLs, initMv, initRm, initRn } from './src/file-system/index.js';
import { getCurrentWorkingDirectory } from './src/helpers.js';
import { logCurrentDirectory, logExitMessage, logInvalidInput, logWelcomeMessage } from './src/logger.js';
import { initCd, initUp } from './src/navigation/index.js';
import { getOsInfo } from './src/operation-system/index.js';
import { initCompress, initDecompress } from './src/zlib/index.js';



const argv = process.argv.slice(2);
const username = argv[0]?.split('=')[1] ?? 'Anonymous';

process.chdir(os.homedir());
const currentWorkingDirectory = getCurrentWorkingDirectory();
logWelcomeMessage(username, currentWorkingDirectory);
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });


const exitProcess = () => {
  logExitMessage(username);
  process.exit();
}

const commandMap = {
  '.exit': () => exitProcess(),
  'up': async () => await initUp(),
  'cd': async (args) => await initCd(args),
  'ls': async () => await initLs(),
  'cat': async (args) => await initCat(args),
  'add': async (args) => await initAdd(args),
  'rn': async (args) => await initRn(args),
  'cp': async (args) => await initCp(args),
  'mv': async (args) => await initMv(args),
  'rm': async (args) => await initRm(args),
  'os': async (args) => await getOsInfo(args[0]),
  'hash': async (args) => await initHash(args),
  'compress': async (args) => await initCompress(args),
  'decompress': async (args) => await initDecompress(args)
};

rl.on('line', async (input) => {
  const [command, ...args] = input.trim().split(' ');
  const handler = commandMap[command];

  if (!handler) {
    logInvalidInput();
  } else {
    await handler(args);
  }

  logCurrentDirectory(getCurrentWorkingDirectory())
});


rl.on('close', () => {
  exitProcess();
})

