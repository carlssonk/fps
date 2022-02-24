import { developerConsole } from '../gui/developerConsole';
import { menu } from '../gui/menu';

export const menuEventListeners = () => {
  setInterval(() => {
    if (
      !document.pointerLockElement &&
      !developerConsole.isVisible &&
      !menu.isVisible
    ) {
      menu.show();
    }
  }, 100);

  menu.resumeNode?.addEventListener('click', () => {
    menu.hide();
  });
};
