import readline from 'readline';

const getCurrentWorkingDirectory = () => {
  return process.cwd();
}

const argv = process.argv.slice(2);
const username = argv[0].split('=')[1];

console.log(`Welcome to the File Manager, ${username}!`);
console.log(`You are currently in ${getCurrentWorkingDirectory()}`);
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });


const exitProcess = () => {
  console.log(`Thank you for using File Manager, ${username}, goodbye!`);
  process.exit();
}

rl.on('line', (input) => {
  console.log(`You are currently in ${getCurrentWorkingDirectory()}`);
  const trimmedInput = input.trim();

  if (trimmedInput === '.exit') {
    exitProcess();
  }

  if (trimmedInput.startsWith('cd')) {
    console.log('before', process.cwd());
    process.chdir('./src');
    console.log('after', process.cwd());
  }

  if (trimmedInput === 'ls') {
    console.log('ls');
  }

  console.log('input', input)
});


rl.on('close', () => {
  exitProcess();
})

