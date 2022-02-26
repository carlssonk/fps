import '../assets/styles/crosshair.css';
// import { developerConsole } from '../gui/developerConsole';
// import { sleep } from '../utils';
// import { waitForElement } from "../utils"

const GUI = document.querySelector('#gui') as HTMLDivElement;

const crosshairHandler = () => {
  const DOM = /*html*/ `
    <div class="crosshair"></div>
  `;
  GUI.insertAdjacentHTML('beforeend', DOM);

  // // State
  // let isVisible = true;

  // return {
  //   get isVisible() {
  //     return isVisible;
  //   },

  //   get resumeNode() {
  //     return document.querySelector('.menu__resume');
  //   },

  //   async hide() {
  //     //     // z-axis position
  //     //     playerCollider.start.z = -5;
  //     //     playerCollider.end.z = -5;
  //     //     // y-axis position
  //     //     playerCollider.start.y = 2;
  //     //     // player height (relative to start.y)
  //     //     playerCollider.end.y = 3;

  //     if (!developerConsole.isVisible) {
  //       document.body.requestPointerLock();

  //       // Sleep here because requestPointerLock is async, and we want to see if the request got through.
  //       // We only need 0 milliseconds because of the JavaScript Event Loop, if you know you know ;)
  //       await sleep(0);
  //       if (document.pointerLockElement !== document.body) return;
  //     }

  //     (document.querySelector('.menu') as HTMLDivElement).style.display =
  //       'none';
  //     isVisible = false;
  //   },

  //   show() {
  //     (document.querySelector('.menu') as HTMLDivElement).style.display = '';
  //     isVisible = true;
  //   }
  // };
};

export const crosshair = crosshairHandler();
