import { logInvalidInput } from "./logger.js";

export const getCurrentWorkingDirectory = () => process.cwd();

export const checkArgs = (args) => {
  if (!args || args.length === 0) {
    logInvalidInput();
    return false;
  }

  return true;
};