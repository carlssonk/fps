import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { scene } from "../../main.js"
import { worldOctree } from '../../main.js';
// import

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

          child.material.map.anisotropy = 8;

        }

      }

    });

    return func()

  });

}

