import * as THREE from 'three';
import { camera, viewmodel } from '../player/player';
import { assets } from './index';

export let mixer: any;

// Relative to camera
const WEAPON_POSITION = [-0.02, 0.02, 0.06];

export const weapons = {
  addAnimations(arms: any, weapon: any) {
    const animationGroup = new THREE.AnimationObjectGroup(
      arms.scene,
      weapon.scene
    );

    mixer = new THREE.AnimationMixer(animationGroup);

    // ACTIONS arms
    const drawActionArms = createAction(arms, 'ak47_draw');
    viewmodel.draw = () => {
      drawActionArms.stop();
      drawActionArms.play();
    };

    const fireActionArms = createAction(arms, 'ak47_fire1');
    viewmodel.fire = () => {
      fireActionArms.stop();
      fireActionArms.play();
    };
  }
};

const createAction = (gltf: any, actionName: string) => {
  const clips = gltf.animations;
  const clip = THREE.AnimationClip.findByName(clips, actionName);

  const action = mixer.clipAction(clip);

  action.clampWhenFinished = true;
  action.setLoop(THREE.LoopOnce);

  return action;
};
