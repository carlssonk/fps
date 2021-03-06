import { menu } from '../gui/menu';
import { developerConsole } from '../gui/developerConsole';

export const consoleEventListeners = () => {
  document.addEventListener('keydown', (event) => {
    if (
      event.code === 'Backquote' ||
      (event.code === 'IntlBackslash' && !menu.isVisible)
    ) {
      developerConsole.toggle();
    }
  });

  document.addEventListener('keyup', (event) => {
    if (event.code === 'Backquote' || event.code === 'IntlBackslash') {
      developerConsole.clearInput();
    }
  });

  developerConsole.exitNode?.addEventListener('click', () => {
    developerConsole.exit();
  });

  developerConsole.formNode?.addEventListener('submit', (event) => {
    event.preventDefault();
  });
};
