import {
  playerOnFloor,
  playerVelocity,
  playerDirection
} from '../player/player';
import { bunnyhop, damping } from './commands/settingsHandler';
import { camera } from '../player/player';
import { developerConsole } from '../gui/developerConsole';
import _ from 'lodash';
import { menu } from '../gui/menu';

const keyStates: any = {};
let spaceIsPressed: boolean = false;
let canJump: boolean = false;
const JUMP_HEIGHT = 1;

export const playerKeyboardControls = (deltaTime: number): void => {
  if (developerConsole.isVisible) return;
  if (menu.isVisible) return;

  const walkSpeed = 5 * damping;
  const walkThrottle = keyStates['ShiftLeft'] ? 0.5 : 1;

  // gives a bit of air control
  // const speedDelta = deltaTime * (playerOnFloor ? 50 * walkSpeed : 20);
  let speedDelta = deltaTime * (walkSpeed * walkThrottle);
  if (!playerOnFloor) speedDelta *= 0.2;

  if (keyStates['KeyW']) {
    playerVelocity.add(getForwardVector().multiplyScalar(speedDelta));
  }

  if (keyStates['KeyS']) {
    playerVelocity.add(getForwardVector().multiplyScalar(-speedDelta));
  }

  if (keyStates['KeyA']) {
    playerVelocity.add(getSideVector().multiplyScalar(-speedDelta));
  }

  if (keyStates['KeyD']) {
    playerVelocity.add(getSideVector().multiplyScalar(speedDelta));
  }

  if (playerOnFloor) {
    // If we can jump OR if we are holding space and bunnyhop is on
    if (canJump || (keyStates['Space'] && bunnyhop)) {
      playerVelocity.y = JUMP_HEIGHT * damping;
    }
  }
};

function getForwardVector() {
  camera.getWorldDirection(playerDirection);
  playerDirection.y = 0;
  playerDirection.normalize();

  return playerDirection;
}

function getSideVector() {
  camera.getWorldDirection(playerDirection);
  playerDirection.y = 0;
  playerDirection.normalize();
  playerDirection.cross(camera.up);

  return playerDirection;
}

document.addEventListener('keydown', (event) => {
  keyStates[event.code] = true;

  offsetJump.startDebounce(event.code);
});

document.addEventListener('keyup', (event) => {
  keyStates[event.code] = false;

  offsetJump.setSpaceIsNotPressed(event.code);
});

// If we hit jump 50 milliseconds before we hit ground, we will automatically jump when player hits ground
// We can later use this logic to increase players speed if user hits jump in the 50ms timeframe
const jumpBeforeHittingFloor = () => {
  function dontJump() {
    canJump = false;
  }

  // Note: if framerate is low the canJump will become false before next frame is set,
  // thus player will not be able to jump at all
  const debounceJump = _.debounce(dontJump, 50);

  return {
    startDebounce(eventCode: string) {
      if (spaceIsPressed || eventCode !== 'Space') return;

      spaceIsPressed = true;
      canJump = true;

      debounceJump();
    },
    setSpaceIsNotPressed(eventCode: string) {
      if (eventCode !== 'Space') return;
      spaceIsPressed = false;
    }
  };
};

const offsetJump = jumpBeforeHittingFloor();
