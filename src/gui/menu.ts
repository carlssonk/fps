import '../assets/styles/menu.css';
import { developerConsole } from '../gui/developerConsole';
import { sleep, setPlayerPosition } from '../utils';
import { assets } from '../game/index';
import {
  hasJoinedMap,
  player
  // PLAYER_HEIGHT,
  // PLAYER_SPAWN_POS,
  // playerCollider,
  // camera
} from '../player/player';
// import { waitForElement } from "../utils"

const GUI = document.querySelector('#gui') as HTMLDivElement;

const menuHandler = () => {
  const DOM = /*html*/ `
    <div class="menu">
      <div class="menu__buttonContainer">
        <button class="menu__button menu__resume">Resume</button>
      </div>
    </div>
  `;
  GUI.insertAdjacentHTML('beforeend', DOM);

  // State
  let isVisible = true;

  return {
    get isVisible() {
      return isVisible;
    },

    get resumeNode() {
      return document.querySelector('.menu__resume');
    },

    async hide() {
      if (!hasJoinedMap) {
        // Init player on map
        assets['ak47'].draw();

        setPlayerPosition([-3, -2, 11], 0);
        player.hasJoinedMap = true;
      }

      if (!developerConsole.isVisible) {
        document.body.requestPointerLock();

        // Sleep here because requestPointerLock is async, and we want to see if the request got through.
        // We only need 0 milliseconds because of the JavaScript Event Loop, if you know you know ;)
        await sleep(0);
        if (document.pointerLockElement !== document.body) return;
      }

      (document.querySelector('.menu') as HTMLDivElement).style.display =
        'none';
      isVisible = false;
    },

    show() {
      (document.querySelector('.menu') as HTMLDivElement).style.display = '';
      isVisible = true;
    }
  };
};

export const menu = menuHandler();
