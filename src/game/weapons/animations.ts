import * as THREE from 'three';
import { AnimationObjectGroup } from 'three/src/animation/AnimationObjectGroup';
import { AnimationMixer } from 'three/src/animation/AnimationMixer';
import { AnimationClip } from 'three/src/animation/AnimationClip';

// variable containing all animations
let mixers: Array<any> = [];
// get animations, add animation, Update animation state (inside game loop)
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
let prevAnimation: any;

interface animationsInferface {
  draw?: string;
  fire?: string;
}

export const addAnimations = (global: any) => {
  return (arms: any, weapon: any) => {
    // Get weapon animations defined in weapons.ts
    const animations = global.weapons[weapon.name].animations;

    createAnimations(arms, weapon, animations);
  };
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
    };
  }
};

const createAction = (gltf: any, actionName: string, mixer: any) => {
  const clips = gltf.animations;
  const clip = AnimationClip.findByName(clips, actionName);

  const action = mixer.clipAction(clip);

  action.clampWhenFinished = true;

  action.setLoop(THREE.LoopOnce);

  return action;
};

// export const weapons: any = {
//   ak47,
//   glock
// };
