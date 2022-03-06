import { loadAsset } from '../scene/loadAsset';
import { animate } from '../index';
import { assetLoader } from '../scene/assetLoader';
import { weapons } from './weapons';
import { player } from '../player/player';

// Game logic in game/ folder
// Game gui in gui/ folder
// Game models in models/ folder

// Example:

// weapons/
//     Weapon logic for each weapon (ak47.ts, awp.ts, glock.ts)

// map.ts
//     Define map logic (1v1, 5v5, ffa, arms race)
//     Define round settings (total rounds, round time)
//     Define out of bounds

// index.ts
//     Load your own map, player models, props, weapons
//     Choose map settings and round settings for current map
//     Set player spawn points

export let assets: any = {};

// Load all your assets for your game
import levelPath from '../assets/models/aim-map-compressed.glb';
import armsPath from '../assets/models/arms.glb';
import ak47Path from '../assets/models/ak47.glb';

const ASSETS = async () => {
  return assetLoader([
    { name: 'level', path: levelPath, options: { isWorld: true } },
    { name: 'arms', path: armsPath, options: { addToScene: false } },
    { name: 'ak47', path: ak47Path, options: { addToScene: false } }
  ]);
};

// Entry for all game logic.
export const GAME = async () => {
  // Map
  assets = await ASSETS();

  // Attach arms and weapon to viewmodel
  player.attachViewmodel(assets['arms'], assets['ak47']);
  // Add animations to arms and weapons
  weapons.addAnimations(assets['arms'], assets['ak47']);

  // // Guns
  // const inventory = {
  //   primary: 'ak-47',
  //   secondary: 'glock-18',
  //   knife: 'default knife',
  //   utility1: 'grenade',
  //   utility2: 'smoke',
  //   utility3: 'flash'
  // };
};
