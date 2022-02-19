import * as THREE from 'three';
import { Capsule } from 'three/examples/jsm/math/Capsule.js';
import { fov } from '../input/commands/settingsHandler';

export const camera = new THREE.PerspectiveCamera(
  fov,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

export const playerCollider = new Capsule(
  new THREE.Vector3(0, 0.35, 0),
  new THREE.Vector3(0, 1, 0),
  0.35
);
export const playerVelocity = new THREE.Vector3();
export const playerDirection = new THREE.Vector3();

export let playerOnFloor = false;
// export const setPlayerOnFloor = (value: boolean) => (playerOnFloor = value);

const playerHandler = () => {
  // Player
  camera.rotation.order = 'YXZ';

  return {
    get camera() {
      return camera;
    },

    set playerOnFloor(value: boolean) {
      playerOnFloor = value;
    },

    set fov(value: number) {
      camera.fov = value;
      camera.updateProjectionMatrix();
    }
  };
};

export const player = playerHandler();
