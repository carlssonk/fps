import './assets/styles/main.css';

import { GAME } from './game';

import { mixerHandler } from './game/weapons';

// Player controls, W A S D, JUMP etc.
import { playerKeyboardControls } from './input/playerKeyboardControls';

// Teleport player if out of bounds (outside playable map)
import { teleportPlayerIfOob } from './scene/teleportPlayerIfOob';

// Player camera
import { camera } from './player/player';

// Update player position
import { updatePlayer } from './player/updatePlayer';

// Import game loop
import { createGameLoop } from './utils';

// Scene and renderer, the core of three.js / WebGL
import { scene, renderer } from './scene/createScene';

// Fps gui
import { stats } from './gui/stats';

import { initGui } from './gui/initGui';

import { playerMouseControls } from './input/playerMouseControls';

initGui();

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
}
// Make game responsive
window.addEventListener('resize', onWindowResize);

// Container for all functions that are dynamic
const myGameLoop = (deltaTime: number) => {
  mixerHandler.Update(deltaTime);

  playerKeyboardControls(deltaTime);

  playerMouseControls.Update(deltaTime);

  updatePlayer(deltaTime);

  teleportPlayerIfOob();

  renderer.render(scene, camera);

  stats.update();
};

// Create an object that gives us useful setters and getters
export const gameLoop = createGameLoop(myGameLoop);

// Infinite looper
export const animate = (deltaTime: number) => {
  gameLoop.loop(deltaTime);

  requestAnimationFrame(animate);
};

// START GAME
GAME();
