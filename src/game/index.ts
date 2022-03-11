import { loadAsset } from '../scene/loadAsset';
import { animate } from '../index';
import { assetLoader } from '../scene/assetLoader';
import { player, viewmodel } from '../player/player';

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
import glockPath from '../assets/models/glock.glb';

const ASSETS = async () => {
  return assetLoader([
    { name: 'level', path: levelPath, options: { isWorld: true } },
    {
      name: 'arms',
      path: armsPath,
      options: { viewmodel: true, type: 'arms' }
    },
    {
      name: 'ak47',
      path: ak47Path,
      options: { viewmodel: true, type: 'primary' }
    },
    {
      name: 'glock',
      path: glockPath,
      options: { viewmodel: true, type: 'secondary' }
    }
  ]);
};

// Entry for all game logic.
export const GAME = async () => {
  // Object containing all game assets
  assets = await ASSETS();

  // Attach default arms and weapon to viewmodel
  player.attachViewmodel(assets['arms'], assets['ak47']);
  // Add secondary weapon to viewmodel
  player.pickupWeapon(assets['glock']);
  // Add knife
  // Add utilities
  console.log(viewmodel);
};
