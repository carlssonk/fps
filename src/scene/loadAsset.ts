import { Mesh } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { scene } from './createScene';
import { Octree } from 'three/examples/jsm/math/Octree.js';

export const worldOctree = new Octree();
const loader = new GLTFLoader();

interface defaultOptions {
  isWorld?: boolean;
  viewmodel?: boolean;
}
const defaultOptions = { isWorld: false, viewmodel: false };

export const loadAsset = (
  model: string,
  options: defaultOptions = defaultOptions
) => {
  return new Promise((resolve: any) => {
    loader.load(model, (gltf) => {
      const opts = { ...defaultOptions, ...options };

      if (!opts.viewmodel) scene.add(gltf.scene);
      if (opts.isWorld) worldOctree.fromGraphNode(gltf.scene);

      gltf.scene.traverse((child) => {
        if ((child as Mesh).isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
          // @ts-ignore
          if (child.material.map) {
            // @ts-ignore
            child.material.map.anisotropy = 4;
          }
        }
      });

      resolve(gltf);
    });
  });
};
