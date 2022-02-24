import { consoleEventListeners } from '../input/consoleEventListeners';
import { menuEventListeners } from '../input/menuEventListeners';

export const initGui = (): void => {
  consoleEventListeners();
  menuEventListeners();
};
