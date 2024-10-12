import { logErrorMessage } from "../logger.js";

export const initUp = () => {
  try {
    process.chdir('..');
  } catch (error) {
    logErrorMessage(error);
  }
}