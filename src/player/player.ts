import * as THREE from 'three';
import { Capsule } from 'three/examples/jsm/math/Capsule.js';
import { fov } from '../input/commands/settingsHandler';
import { scene } from '../scene/createScene';
import { weapons } from '../game/weapons';
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
// camera.add(ak47Model);
// console.log(camera.add);

export const playerCollider = new Capsule(
  new THREE.Vector3(0, 0.35, 0),
  new THREE.Vector3(0, 1, 0),
  0.35
);

export const playerVelocity = new THREE.Vector3();
export const playerDirection = new THREE.Vector3();

export let playerOnFloor = false;

// const inventory = {

// }

export const viewmodel: any = new THREE.Group();

const playerHandler = () => {
  // Player
  camera.rotation.order = 'YXZ';

  let primaryWeapon: any;
  let secondaryWeapon: any;

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

    set weapon(value: any) {
      primaryWeapon = value;
    },

    get weapon() {
      return primaryWeapon;
    },

    attachViewmodel(armsModel: any, weaponModel: any) {
      // Add viewmodel to scene
      viewmodel.rotation.y = Math.PI;

      viewmodel.add(armsModel.scene);
      viewmodel.add(weaponModel.scene);
      viewmodel.weapon = weaponModel;

      viewmodel.position.set(...WEAPON_POSITION);
      viewmodel.defaultPosition = {
        x: WEAPON_POSITION[0],
        y: WEAPON_POSITION[1],
        z: WEAPON_POSITION[2]
      };
      viewmodel.scale.set(0.01, 0.01, 0.008);

      camera.add(viewmodel);
      // Add animations
      weapons[weaponModel.name].addAnimations(armsModel, weaponModel);
      viewmodel.weapon.draw(); // To set default idle position state
    },

    pickupWeapon(weaponModel: any) {
      // viewmodel.children[1].visible = false;
      weaponModel.scene.visible = false;
      viewmodel.add(weaponModel.scene);

      // Add animations
      weapons['glock'].addAnimations(assets['arms'], assets['glock']);
    },

    switchWeapon(weapon: string) {
      // if (weapon === 'glock') {
      //   // Hide current weapons
      //   viewmodel.weapon.scene.visible = false;
      //   // viewmodel.weapon.draw();
      //   // Change to new weapon
      //   viewmodel.weapon = assets[weapon];

      //   viewmodel.weapon.scene.visible = true;
      // }

      viewmodel.weapon.draw();

      // Show new animation and add animations
      // weapons['glock'].addAnimations(assets['arms'], assets[weapon]);
    }
  };
};

export const player = playerHandler();
