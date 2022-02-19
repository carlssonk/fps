import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { scene } from "./createScene"

import { Octree } from 'three/examples/jsm/math/Octree.js';
export const worldOctree = new Octree();

export const mapLoader = (map, func) => {

  const loader = new GLTFLoader()

  loader.load(map, (gltf) => {

    scene.add(gltf.scene);

    worldOctree.fromGraphNode(gltf.scene);

    gltf.scene.traverse(child => {

      if (child.isMesh) {

        child.castShadow = true;
        child.receiveShadow = true;

        if (child.material.map) {

          child.material.map.anisotropy = 4;

        }

      }

    });

    return func()

  });

}

