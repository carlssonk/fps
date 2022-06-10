import * as THREE from 'three';
import { Capsule } from 'three/examples/jsm/math/Capsule.js';
import { fov } from '../input/commands/settingsHandler';
import { scene } from '../scene/createScene';
import { weapons } from '../game/weapons/weapons';
import { assets } from '../game';

export let hasJoinedMap = false;
export const PLAYER_HEIGHT = 0.92;

const WEAPON_POSITION = [0.02, -0.01, 0.02];

export const camera = new THREE.PerspectiveCamera(
  fov,
  window.innerWidth / window.innerHeight,
  0.01,
  1000
);
// Add camera to scene so we can attach items to it such as arms and weapons
scene.add(camera);

export const playerCollider = new Capsule(
  new THREE.Vector3(0, 0, 0),
  new THREE.Vector3(0, 0, 0),
  0
);
console.log(playerCollider);

export const playerVelocity = new THREE.Vector3();
export const playerDirection = new THREE.Vector3();

export let playerOnFloor = false;

export const viewmodel: any = new THREE.Group();

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

    set hasJoinedMap(value: boolean) {
      hasJoinedMap = value;
    },

    set fov(value: number) {
      camera.fov = value;
      camera.updateProjectionMatrix();
    },

    attachViewmodel(armsModel: any, weaponModel: any) {
      // Viewmodel transformations
      viewmodel.rotation.y = Math.PI;
      viewmodel.position.set(...WEAPON_POSITION);
      viewmodel.defaultPosition = {
        x: WEAPON_POSITION[0],
        y: WEAPON_POSITION[1],
        z: WEAPON_POSITION[2]
      };
      viewmodel.scale.set(0.01, 0.01, 0.008);

      // Add viewmodel to scene
      viewmodel.add(armsModel.scene);
      viewmodel.add(weaponModel.scene);

      // Add weapon references to viewmodel
      viewmodel.weapon = weaponModel;
      viewmodel[armsModel.type] = armsModel;
      viewmodel[weaponModel.type] = weaponModel;

      // Add animations
      weapons[weaponModel.name].addAnimations(armsModel, weaponModel);

      camera.add(viewmodel);

      // Set default idle position state
      viewmodel.weapon.draw();
    },

    pickupWeapon(weaponModel: any) {
      // Dont show the weapon we just picked up
      weaponModel.scene.visible = false;
      viewmodel.add(weaponModel.scene);

      // Add weapon references to viewmodel
      viewmodel[weaponModel.type] = weaponModel;

      // Add animations
      weapons[weaponModel.name].addAnimations(viewmodel.arms, weaponModel);
    },

    switchWeapon(type: string) {
      // If we are holding the weapon that we want to switch to, return
      if (viewmodel.weapon.name === viewmodel[type].name) return;

      // Hide curremt weapon and show new weapon
      viewmodel.weapon.scene.visible = false;
      viewmodel[type].scene.visible = true;

      // Add weapon references to viewmodel
      viewmodel.weapon = viewmodel[type];

      viewmodel.weapon.draw();
    }
  };
};

export const player = playerHandler();
