import {
  playerOnFloor,
  playerVelocity,
  playerDirection
} from '../player/player';
import { camera } from '../player/player';
import { developerConsole } from '../gui/developerConsole';

const keyStates: any = {};

export const playerKeyboardControls = (deltaTime: number): void => {
  if (developerConsole.isVisible) return;

  const walkSpeed = keyStates['ShiftLeft'] ? 0.5 : 1;

  // gives a bit of air control
  const speedDelta = deltaTime * (playerOnFloor ? 100 * walkSpeed : 20);

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
    if (keyStates['Space']) {
      playerVelocity.y = 15;
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
});

document.addEventListener('keyup', (event) => {
  keyStates[event.code] = false;
});
