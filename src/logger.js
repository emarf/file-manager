export const logWelcomeMessage = (username, directory) => {
  console.log(`Welcome to the File Manager, ${username}!`);
  console.log(`You are currently in ${directory}`);
};

export const logExitMessage = (username) => {
  console.log(`Thank you for using File Manager, ${username}, goodbye!`);
};

export const logInvalidInput = () => {
  console.log('Invalid input');
};

export const logErrorMessage = (error) => {
  console.log('Operation failed');
  console.log(error.message);
}

export const logCurrentDirectory = (directory) => {
  console.log(`You are currently in ${directory}`);
};