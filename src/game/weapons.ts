import * as THREE from 'three';
import { camera } from '../player/player';

export let mixer: any;

// Relative to camera
const WEAPON_POSITION = [-0.02, 0.02, 0.06];

export const weapons = {
  ak47: (gltf: any) => ak47(gltf)
};

const ak47 = (gltf: any) => {
  const weapon = gltf.scene;

  camera.add(weapon);

  weapon.rotation.y = Math.PI - 0.1;
  weapon.position.set(...WEAPON_POSITION);
  weapon.defaultPosition = {
    x: WEAPON_POSITION[0],
    y: WEAPON_POSITION[1],
    z: WEAPON_POSITION[2]
  };
  weapon.scale.set(0.02, 0.02, 0.02);

  mixer = new THREE.AnimationMixer(weapon);

  // ACTIONS
  const drawAction = createAction(gltf, 'draw');
  gltf.draw = () => {
    drawAction.stop();
    drawAction.play();
  };

  const fireAction = createAction(gltf, 'fire1');
  gltf.fire = () => {
    fireAction.stop();
    fireAction.play();
  };
  console.log(gltf);
};

const createAction = (gltf: any, actionName: string) => {
  const clips = gltf.animations;
  const clip = THREE.AnimationClip.findByName(clips, actionName);
  console.log(clips);
  console.log(clip);

  const action = mixer.clipAction(clip);

  action.clampWhenFinished = true;
  action.setLoop(THREE.LoopOnce);

  return action;
};
