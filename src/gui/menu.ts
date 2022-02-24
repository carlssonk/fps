import '../assets/styles/menu.css';
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

    hide() {
      //     // z-axis position
      //     playerCollider.start.z = -5;
      //     playerCollider.end.z = -5;
      //     // y-axis position
      //     playerCollider.start.y = 2;
      //     // player height (relative to start.y)
      //     playerCollider.end.y = 3;
      document.body.requestPointerLock();
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
