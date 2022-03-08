import { loadAsset } from './loadAsset';
import { animate } from '../index';

export const assetLoader = async (assetsArray: Array<any>) => {
  const promises: any = [];
  const assets: any = {};

  function addAsset(asset: string, name: string, options?: object) {
    return loadAsset(asset, options).then((result: any) => {
      result.name = name;
      assets[name] = result;
    });
  }

  for (const { path, name, options } of assetsArray) {
    promises.push(addAsset(path, name, options));
  }

  // Wait for all assets to be loaded
  await Promise.all(promises);

  animate(0); // start game loop when all assets have loaded

  return assets;
};
