import { Material, Mesh } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { scene } from './createScene';

import { Octree } from 'three/examples/jsm/math/Octree.js';
export const worldOctree = new Octree();

export const mapLoader = (map: string, func: () => void) => {
  const loader = new GLTFLoader();

  loader.load(map, (gltf) => {
    scene.add(gltf.scene);

    // gltf.scene.renderOrder = -1;

    worldOctree.fromGraphNode(gltf.scene);

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

    return func();
  });
};
