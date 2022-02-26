import { fps_max } from './input/commands/settingsHandler';
import {
  hasJoinedMap,
  player,
  PLAYER_HEIGHT,
  PLAYER_SPAWN_POS,
  playerCollider,
  camera
} from './player/player';

export const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms));

export const createGameLoop = (func: (deltaTime: number) => void) => {
  let targetFps: number = 0;
  let fpsInterval: number = 0;
  let lastTime: number = 0;
  let lastOverTime: number = 0;
  let prevOverTime: number = 0;
  let deltaTime: number = 0;

  function updateFps(value: number) {
    targetFps = value;
    fpsInterval = 1000 / targetFps;
  }

  updateFps(fps_max);

  return {
    set fps(value: number) {
      updateFps(value);
    },

    get deltaTime() {
      return deltaTime;
    },

    // the frame-capped loop function
    loop(time: number) {
      deltaTime = time - lastTime;

      if (deltaTime >= fpsInterval) {
        prevOverTime = lastOverTime;
        lastOverTime = deltaTime % fpsInterval;
        lastTime = time - lastOverTime;

        // keep time elapsed in sync with real life
        deltaTime -= prevOverTime;

        // "normalize" the delta time (so 1 equals to 1 second)
        deltaTime *= 0.001;
        func(deltaTime);
      }
    }
  };
};

export const waitForElement = (selector: string) =>
  new Promise((resolve) => {
    if (document.querySelector(selector)) {
      return resolve(document.querySelector(selector));
    }

    const observer = new MutationObserver(() => {
      if (document.querySelector(selector)) {
        resolve(document.querySelector(selector));
        observer.disconnect();
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  });

export const setPlayerPosition = (
  position: [number, number, number] = [0, 0, 0],
  rotation: number = 0
): void => {
  playerCollider.start.set(position[0], position[1], position[2]);
  playerCollider.end.set(position[0], position[1] + PLAYER_HEIGHT, position[2]);
  // Set camera rotation
  camera.rotation.y = rotation;
};
