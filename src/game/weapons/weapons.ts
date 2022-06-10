import { addAnimations } from './animations';

interface weaponInterface {
  addAnimations: any;
  isAutomatic: boolean;
  animations: {
    draw: string;
    fire: string;
  };
  spray: any;
}

const handlers = {
  addAnimations: addAnimations(this)
};

// DEFINE WEAPONS BELOW
// NOTES:
// Each weapon must have include ...handlers
// The names must match coresponding asset name

const ak47: weaponInterface = {
  ...handlers,
  isAutomatic: false,
  animations: {
    draw: 'ak47_draw',
    fire: 'ak47_fire1'
  },
  // [x,y] offset from previous bullet (when holding mouse or spraying)
  spray: [
    [0, 0],
    [0, 1],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0]
  ]
};

const glock: weaponInterface = {
  ...handlers,
  spray: [],
  isAutomatic: false,
  animations: {
    draw: 'glock_draw',
    fire: 'glock_firesingle'
  }
};

export const weapons: any = { ak47, glock };
