import { consoleEventListeners } from '../input/consoleEventListeners';
import { menuEventListeners } from '../input/menuEventListeners';
import { crosshair } from './crosshair';

export const initGui = (): void => {
  consoleEventListeners();
  menuEventListeners();
  crosshair;
};
