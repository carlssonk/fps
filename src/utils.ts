import { fps_max } from './input/commands/settingsHandler';

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
