import { update } from 'lodash';
import * as THREE from 'three';
// import { AnimationObjectGroup, AnimationMixer, AnimationClip } from 'three/src/animation/';
import { AnimationObjectGroup } from 'three/src/animation/AnimationObjectGroup';
import { AnimationMixer } from 'three/src/animation/AnimationMixer';
import { AnimationClip } from 'three/src/animation/AnimationClip';
import { camera, viewmodel } from '../player/player';
import { assets } from './index';

let mixers: Array<any> = [];
export const mixerHandler = {
  get mixers() {
    return mixers;
  },
  add(mixer: any) {
    mixers.push(mixer);
  },
  Update(deltaTime: number) {
    for (const mix of mixers) {
      mix.update(deltaTime);
    }
  }
};

// Relative to camera
const WEAPON_POSITION = [-0.02, 0.02, 0.06];
let prevAnimation: any;

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
  const animationGroup = new AnimationObjectGroup(arms.scene, weapon.scene);
  const mixer = new AnimationMixer(animationGroup);
  mixerHandler.add(mixer);

  for (const [key, value] of Object.entries(animations)) {
    const animation = createAction(arms, value, mixer);
    weapon[key] = () => {
      // Stop previous animation
      weapon.clearPrevAnimation();

      animation.play();

      prevAnimation = animation;
    };
    weapon['clearPrevAnimation'] = () => {
      if (prevAnimation) {
        prevAnimation.stop();
        animation.stop();
      }

      // animation.stop();
    };
  }

  // console.log(weapon);
  // weapon.scene.visible = true;
  // viewmodel.weapon = weapon;

  // We need to play an animation directly to set default animation
  // viewmodel.weapon.draw();
};

const createAction = (gltf: any, actionName: string, mixer: any) => {
  const clips = gltf.animations;
  const clip = AnimationClip.findByName(clips, actionName);

  const action = mixer.clipAction(clip);

  action.clampWhenFinished = true;

  action.setLoop(THREE.LoopOnce);

  return action;
};

export const weapons: any = {
  ak47,
  glock
};
