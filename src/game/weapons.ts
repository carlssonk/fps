import * as THREE from 'three';
import { camera, viewmodel } from '../player/player';
import { assets } from './index';

export let mixer: any;

// Relative to camera
const WEAPON_POSITION = [-0.02, 0.02, 0.06];

interface animationsInferface {
  draw?: string;
  fire?: string;
}

const ak47 = {
  addAnimations(arms: any, weapon: any) {
    // Define your animation names here,
    // Value must match values on both arms and weapon,
    const animations: animationsInferface = {
      draw: 'ak47_draw',
      fire: 'ak47_fire1'
    };

    createAnimations(arms, weapon, animations);
  }
};

const glock = {
  addAnimations(arms: any, weapon: any) {
    // Define your animation names here,
    // Value must match values on both arms and weapon,
    const animations: animationsInferface = {
      draw: 'glock_draw',
      fire: 'glock_firesingle'
    };

    createAnimations(arms, weapon, animations);
  }
};

const createAnimations = (arms: any, weapon: any, animations: object) => {
  const animationGroup = new THREE.AnimationObjectGroup(
    arms.scene,
    weapon.scene
  );

  mixer = new THREE.AnimationMixer(animationGroup);

  for (const [key, value] of Object.entries(animations)) {
    const animation = createAction(arms, value);
    viewmodel[key] = () => {
      animation.stop();
      animation.play();
    };
  }

  // We need to play an animation directly to set default animation
  viewmodel.draw();
};

const createAction = (gltf: any, actionName: string) => {
  const clips = gltf.animations;
  const clip = THREE.AnimationClip.findByName(clips, actionName);

  const action = mixer.clipAction(clip);

  action.clampWhenFinished = true;
  action.setLoop(THREE.LoopOnce);

  return action;
};

export const weapons: any = {
  ak47,
  glock
};
