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
    { name: 'arms', path: armsPath, options: { addToScene: false } },
    { name: 'ak47', path: ak47Path, options: { addToScene: false } },
    { name: 'glock', path: glockPath, options: { addToScene: false } }
  ]);
};

// Entry for all game logic.
export const GAME = async () => {
  // Object containing all game assets
  assets = await ASSETS();

  // Attach default arms and weapon to viewmodel
  player.attachViewmodel(assets['arms'], assets['ak47']);
  // Add secondary weapon to viewmodel
  // player.pickupWeapon(assets['glock']);

  // How to pickup a weapon from ground
  // viewmodel.pickup("glock") - Picks up a weapon but not switching to it
  //   viewmodel.add(glock) - Add item to viewmodel.children

  // How to switch to a weapon
  // viewmodel.switch("glock") - Switches to weapon in inverntory
  //   viewmodel.weapon = glock - Change current weapon
  //   viewmodel.weapon.draw()

  // How to drop a weapon
  // viewmodel.drop("glock")
  //   viewmodel.weapon = ak47 - Change to another weapon in children
  //   viewmodel.remove(glock) - Remove item from viewmodel.children

  // How to cycle between weapons
  // just use to viewmodel.children array to determine next prev weapons (keep the list sorted if needed)
};
