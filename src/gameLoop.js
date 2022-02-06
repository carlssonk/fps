export const createGameLoop = (func, fps = 60) => {
  let targetFps = 0, fpsInterval = 0;
  let lastTime = 0, lastOverTime = 0, prevOverTime = 0, deltaTime = 0;

  function updateFps(value) {
    targetFps = value;
    fpsInterval = 1000 / targetFps;
  }

  updateFps(fps);

  return {
    // getter/setter for targeted frame rate
    get fps() {
      return targetFps;
    },
    set fps(value) {
      updateFps(value);
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