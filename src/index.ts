import './assets/styles/main.css';

// Player controls, W A S D, JUMP etc.
import { playerKeyboardControls } from './input/playerKeyboardControls';

// Teleport player if out of bounds (outside playable map)
import { teleportPlayerIfOob } from './scene/teleportPlayerIfOob';

// Player camera
import { camera, playerCollider } from './player/player';

// Update player position
import { updatePlayer } from './player/updatePlayer';

// Load a gltf/glb model
import { mapLoader } from './scene/mapLoader';

// Import game loop
import { createGameLoop } from './utils';

// Scene and renderer, the core of three.js / WebGL
import { scene, renderer } from './scene/createScene';

// Fps gui
import { stats } from './gui/stats';

import { initGui } from './gui/initGui';

import { playerMouseMove } from './input/playerMouseMove';

initGui();
playerMouseMove();

// PointerLockEvent
document.addEventListener(
  'mousedown',
  () => {
    document.body.requestPointerLock();

    // We need to explicitly set player position and player height when user interacts with page

    // z-axis position
    playerCollider.start.z = -5;
    playerCollider.end.z = -5;
    // y-axis position
    playerCollider.start.y = 2;
    // player height (relative to start.y)
    playerCollider.end.y = 3;
  },
  { once: true }
);

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
}
// Make game responsive
window.addEventListener('resize', onWindowResize);

// Container for all functions that are dynamic
const myGameLoop = (deltaTime: number) => {
  playerKeyboardControls(deltaTime);

  updatePlayer(deltaTime);

  teleportPlayerIfOob();

  renderer.render(scene, camera);

  stats.update();
};

// Create an object that gives us useful setters and getters
export const gameLoop = createGameLoop(myGameLoop);

// Infinite looper
function animate(deltaTime: number) {
  gameLoop.loop(deltaTime);

  requestAnimationFrame(animate);
}

// Load model
// import WORLD from './models/collision-world.glb';
import AimMap from './assets/models/aim-map-compressed-2.glb';
mapLoader(AimMap, () => {
  // setTimeout(() => {
  animate(0);
  // }, 500);
});
