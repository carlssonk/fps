import "./styles/main.css"

import * as THREE from 'three';

import Stats from 'three/examples/jsm/libs/stats.module.js';


import { Octree } from 'three/examples/jsm/math/Octree.js';
import { Capsule } from 'three/examples/jsm/math/Capsule.js';

export const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.rotation.order = 'YXZ';

const clock = new THREE.Clock();

import { createScene } from "./3d/scene/createScene.js"
export const scene = createScene();


const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.VSMShadowMap;

const container = document.getElementById('container');

container.appendChild(renderer.domElement);

const stats = new Stats();
stats.domElement.style.position = 'absolute';
stats.domElement.style.top = '0px';

container.appendChild(stats.domElement);

export const GRAVITY = 30;

const NUM_SPHERES = 100;
const SPHERE_RADIUS = 0.2;

const STEPS_PER_FRAME = 5;

const sphereGeometry = new THREE.SphereGeometry(SPHERE_RADIUS, 32, 32);
const sphereMaterial = new THREE.MeshStandardMaterial({ color: 0x888855, roughness: 0.8, metalness: 0.5 });

export const vector1 = new THREE.Vector3();
export const vector2 = new THREE.Vector3();
export const vector3 = new THREE.Vector3();

export const spheres = [];
export let sphereIdx = 0;

export const setSphereIdx = (value) => sphereIdx = value;

for (let i = 0; i < NUM_SPHERES; i++) {

  const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
  sphere.castShadow = true;
  sphere.receiveShadow = true;

  scene.add(sphere);

  spheres.push({ mesh: sphere, collider: new THREE.Sphere(new THREE.Vector3(0, - 100, 0), SPHERE_RADIUS), velocity: new THREE.Vector3() });

}

export const worldOctree = new Octree();

export const playerCollider = new Capsule(new THREE.Vector3(0, 0.35, 0), new THREE.Vector3(0, 1, 0), 0.35);

export const playerVelocity = new THREE.Vector3();
export const playerDirection = new THREE.Vector3();

export let playerOnFloor = false;
export const setPlayerOnFloor = (value) => playerOnFloor = value;


export let mouseTime = 0;
export const setMouseTime = (value) => mouseTime = value;

export const keyStates = {};

import { throwBall } from "./3d/player/throwBall"

document.addEventListener('keydown', (event) => {

  keyStates[event.code] = true;

});

document.addEventListener('keyup', (event) => {

  keyStates[event.code] = false;

});

document.addEventListener('mousedown', () => {

  document.body.requestPointerLock();

  mouseTime = performance.now();

});

document.addEventListener('mouseup', () => {

  throwBall();

});

document.body.addEventListener('mousemove', (event) => {

  if (document.pointerLockElement === document.body) {

    camera.rotation.y -= event.movementX / 500;
    camera.rotation.x -= event.movementY / 500;

  }

});

window.addEventListener('resize', onWindowResize);

function onWindowResize() {

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);

}







// Player controls, W A S D, JUMP etc.
import { controls } from "./3d/player/controls.js"

// Teleport player if out of bounds (outside playable map)
import { teleportPlayerIfOob } from "./3d/scene/teleportPlayerIfOob.js"

// Update player position
import { updatePlayer } from "./3d/player/updatePlayer"

// Update Spheres position
import { updateSpheres } from "./3d/scene/updateSpheres"

// Load a gltf/glb model
import { mapLoader } from "./3d/scene/mapLoader.js"
// Load model
import WORLD from "./3d/models/collision-world.glb"
mapLoader(WORLD, () => {
  animate();
})


import { createGameLoop } from "./gameLoop"


const myGameLoop = (deltaTime) => {

  controls(deltaTime);

  updatePlayer(deltaTime);

  updateSpheres(deltaTime);

  teleportPlayerIfOob();

  renderer.render(scene, camera);

  stats.update();
}


const gameLoop = createGameLoop(myGameLoop, 144)





function animate(deltaTime) {

  gameLoop.loop(deltaTime)

  requestAnimationFrame(animate);

}





// function animate() {

//   const deltaTime = Math.min(0.05, clock.getDelta()) / STEPS_PER_FRAME;

//   // we look for collisions in substeps to mitigate the risk of
//   // an object traversing another too quickly for detection.

//   for (let i = 0; i < STEPS_PER_FRAME; i++) {

//     controls(deltaTime);

//     updatePlayer(deltaTime);

//     updateSpheres(deltaTime);

//     teleportPlayerIfOob();

//   }

//   renderer.render(scene, camera);

//   stats.update();

//   requestAnimationFrame(animate);

// }