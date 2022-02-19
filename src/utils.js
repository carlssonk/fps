import { fpsMax } from "./input/commands/settingsHandler";

export const createGameLoop = (func) => {
  let targetFps = 0, fpsInterval = 0;
  let lastTime = 0, lastOverTime = 0, prevOverTime = 0, deltaTime = 0;

  function updateFps(value) {
    targetFps = value;
    fpsInterval = 1000 / targetFps;
  }

  updateFps(fpsMax);

  return {

    set fps(value) {
      updateFps(value);
    },

    get deltaTime() {
      return deltaTime;
    },

    // the frame-capped loop function
    loop(time) {
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
    },
  };
}

export const waitForElement = (selector) => {
  return new Promise(resolve => {
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
}