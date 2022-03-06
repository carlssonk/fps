import './assets/styles/main.css';

import * as THREE from 'three';

import { GAME } from './game';

import { mixer } from './game/weapons';

// Player controls, W A S D, JUMP etc.
import { playerKeyboardControls } from './input/playerKeyboardControls';

// Teleport player if out of bounds (outside playable map)
import { teleportPlayerIfOob } from './scene/teleportPlayerIfOob';

// Player camera
import { camera } from './player/player';

// Update player position
import { updatePlayer } from './player/updatePlayer';

// Load a gltf/glb model
import { mapLoader } from './scene/mapLoader';

// Import game loop
import { createGameLoop } from './utils';

// Scene and renderer, the core of three.js / WebGL
import { scene, sceneTop, renderer } from './scene/createScene';

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
  mixer.update(deltaTime);

  playerKeyboardControls(deltaTime);

  playerMouseControls.Update(deltaTime);

  updatePlayer(deltaTime);

  teleportPlayerIfOob();

  // renderer.clear();

  renderer.render(scene, camera);

  // renderer.clearDepth();

  // renderer.render(sceneTop, camera);

  stats.update();
};

// Create an object that gives us useful setters and getters
export const gameLoop = createGameLoop(myGameLoop);

// Infinite looper
export const animate = (deltaTime: number) => {
  gameLoop.loop(deltaTime);

  requestAnimationFrame(animate);
};

// Load model
// import WORLD from './models/collision-world.glb';
// import AimMap from './assets/models/aim-map-compressed.glb';
// mapLoader(AimMap, () => {
// setTimeout(() => {
// animate(0);
// }, 500);
// });

// Load Weapon
// import ak47 from './assets/models/ak47.glb';
// console.log(ak47);
// import { loadGLTF } from './scene/loadGLTF';
// export let ak47Model: any;
// let mixer: any;
// loadGLTF(ak47).then((gltf: any) => {
//   ak47Model = gltf.scene;
//   // const cameraOffset = new THREE.Vector3(0.0, 5.0, -5.0);
//   //

//   // ak47Model.renderOrder = 999;
//   // ak47Model.onBeforeRender = function (renderer: { clearDepth: () => void }) {
//   //   renderer.clearDepth();
//   // };

//   // camera.add(ak47Model);
//   // camera.add(ak47Model.children[0]);
//   // mesh.renderOrder=-1
//   camera.add(ak47Model);
//   // ak47Model.renderOrder = 1;
//   // console.log(ak47Model);
//   // console.log(ak47Model.material);

//   ak47Model.rotation.y = Math.PI - 0.1;
//   ak47Model.position.set(-0.02, 0.02, 0.06);
//   ak47Model.scale.set(0.02, 0.02, 0.02);

//   mixer = new THREE.AnimationMixer(ak47Model);
//   const clips = gltf.animations;
//   const clip = THREE.AnimationClip.findByName(clips, 'draw');

//   const action = mixer.clipAction(clip);

//   action.clampWhenFinished = true;
//   action.setLoop(THREE.LoopOnce);

//   setTimeout(() => {
//     action.play();
//   }, 500);
//   console.log(action);
// });

// START GAME
GAME();
