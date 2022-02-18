import "./styles/main.css"


import * as THREE from 'three';

import Stats from 'three/examples/jsm/libs/stats.module.js';


import { Octree } from 'three/examples/jsm/math/Octree.js';
import { Capsule } from 'three/examples/jsm/math/Capsule.js';


import { playerMouseMove } from "./input/playerMouseMove";

// Player controls, W A S D, JUMP etc.
import { controls } from "./input/controls"

// Teleport player if out of bounds (outside playable map)
import { teleportPlayerIfOob } from "./scene/teleportPlayerIfOob"

// Update player position
import { updatePlayer } from "./player/updatePlayer"

// Update Spheres position
import { updateSpheres } from "./scene/updateSpheres"

// Load a gltf/glb model
import { mapLoader } from "./scene/mapLoader"
// Load model
import WORLD from "./models/collision-world.glb"
mapLoader(WORLD, () => {
  animate();
})


import { createGameLoop } from "./utils"

import { toggleConsole } from "./input/toggleConsole"
toggleConsole();


// VARIABLES
let fov = 70;
export let sensetivity = 2.5;

export const camera = new THREE.PerspectiveCamera(fov, window.innerWidth / window.innerHeight, 0.1, 1000);

camera.rotation.order = 'YXZ';

const clock = new THREE.Clock();

import { createScene } from "./scene/createScene.js"
export const scene = createScene();

const container = document.getElementById('container');

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.VSMShadowMap;

renderer.outputEncoding = THREE.sRGBEncoding;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
container.appendChild(renderer.domElement);

const stats = new Stats();
stats.domElement.style.position = 'absolute';
stats.domElement.style.top = '0px';
container.appendChild(stats.domElement);

export const GRAVITY = 30;

const NUM_SPHERES = 100;
const SPHERE_RADIUS = 0.2;

const STEPS_PER_FRAME = 5;

const sphereGeometry = new THREE.IcosahedronGeometry(SPHERE_RADIUS, 5);
const sphereMaterial = new THREE.MeshLambertMaterial({ color: 0xbbbb44 });

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

  spheres.push({
    mesh: sphere,
    collider: new THREE.Sphere(new THREE.Vector3(0, - 100, 0), SPHERE_RADIUS),
    velocity: new THREE.Vector3()
  });

}






playerMouseMove();















export const worldOctree = new Octree();
export const playerCollider = new Capsule(new THREE.Vector3(0, 0.35, 0), new THREE.Vector3(0, 1, 0), 0.35);
export const playerVelocity = new THREE.Vector3();
export const playerDirection = new THREE.Vector3();

export let playerOnFloor = false;
export const setPlayerOnFloor = (value) => playerOnFloor = value;


export let mouseTime = 0;
export const setMouseTime = (value) => mouseTime = value;

export const keyStates = {};

import { throwBall } from "./player/throwBall"

document.addEventListener('keydown', (event) => {

  keyStates[event.code] = true;

});

document.addEventListener('keyup', (event) => {

  keyStates[event.code] = false;

});

document.addEventListener('mousedown', () => {

  // document.body.requestPointerLock();

  mouseTime = performance.now();

});

document.addEventListener('mouseup', () => {

  if (document.pointerLockElement !== null) throwBall();

});






// Make game responsive
window.addEventListener('resize', onWindowResize);

function onWindowResize() {

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);

}


// Container for all functions that are dynamic
const myGameLoop = (deltaTime) => {

  controls(deltaTime);

  updatePlayer(deltaTime);

  updateSpheres(deltaTime);

  teleportPlayerIfOob();

  renderer.render(scene, camera);

  stats.update();

}

// Create an object that gives us useful setters and getters
const gameLoop = createGameLoop(myGameLoop)

// Infinite looper
function animate(deltaTime) {

  gameLoop.loop(deltaTime)

  requestAnimationFrame(animate);

}
