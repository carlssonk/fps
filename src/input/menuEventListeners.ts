import { developerConsole } from '../gui/developerConsole';
import { menu } from '../gui/menu';

export const menuEventListeners = () => {
  // Listen for Escape events when pointer is NOT locked
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !menu.isVisible) {
      menu.show();
    }
  });

  // Listen for Escape events when pointer IS locked
  document.addEventListener('pointerlockchange', () => {
    if (
      document.pointerLockElement !== document.body && // Mouse is not locked
      !developerConsole.isVisible // console is not open
    ) {
      menu.show();
    }
  });

  menu.resumeNode?.addEventListener('click', () => {
    menu.hide();
  });
};
