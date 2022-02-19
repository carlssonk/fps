import '../styles/console.css';
import { waitForElement } from '../utils';
import { settings } from '../input/commands/settingsHandler';

const GUI = document.querySelector('#gui');

const developerConsoleHandler = () => {
  const DOM = /*html*/ `
    <div class="console" style="display: none;">
      <div class="console__dragBar"><span>Console</span><span class="console__exit"></span></div>
      <ul class="console__list">
        <li>Type !help to list all commands</li>
      </ul>
      <form class="console__inputContainer">
        <input class="console__input" type="text" spellcheck="false">
        <button class="console__button">Submit</button>
      </form>
    </div>
  `;
  GUI?.insertAdjacentHTML('beforeend', DOM);

  // Attach methods that are dependant on this DOM tree.
  attachDependencies();

  // State
  let isVisible = false;

  return {
    get isVisible() {
      return isVisible;
    },
    get exitNode() {
      return document.querySelector('.console__exit');
    },
    get inputNode() {
      return document.querySelector('.console__input');
    },
    get buttonNode() {
      return document.querySelector('.console__button');
    },
    get listNode() {
      return document.querySelector('.console__list');
    },
    get formNode() {
      return document.querySelector('.console__inputContainer');
    },

    toggle() {
      if (isVisible) {
        hideConsole();
      } else {
        (document.querySelector('.console') as HTMLDivElement).style.display =
          '';
        document.exitPointerLock();

        (document.querySelector('.console__input') as HTMLDivElement).blur();
      }

      isVisible = !isVisible;
    },

    exit() {
      hideConsole();
      isVisible = false;
    },

    clearInput() {
      (document.querySelector('.console__input') as HTMLInputElement).value =
        '';
      (document.querySelector('.console__input') as HTMLInputElement).focus();
    }
  };
};

const hideConsole = () => {
  (document.querySelector('.console') as HTMLDivElement).style.display = 'none';
  document.body.requestPointerLock();
};

const attachDependencies = async () => {
  // Wait for tree to be available
  await waitForElement('.console');

  // Invoke methods now that the nodes are available
  handleDrag(
    document.querySelector('.console') as HTMLDivElement,
    document.querySelector('.console__dragBar') as HTMLDivElement
  );
  settings.attachConsole();
};

const handleDrag = (element: HTMLDivElement, dragBar: HTMLDivElement) => {
  // Make the DIV element draggable:
  var pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;
  if (dragBar) {
    // if present, the header is where you move the DIV from:
    dragBar.onmousedown = dragMouseDown;
  } else {
    // otherwise, move the DIV from anywhere inside the DIV:
    element.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e: any) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e: any) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    element.style.top = element.offsetTop - pos2 + 'px';
    element.style.left = element.offsetLeft - pos1 + 'px';
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
};

export const developerConsole = developerConsoleHandler();
