import * as THREE from 'three';

export const createScene = () => {

  const scene = new THREE.Scene();

  scene.background = new THREE.Color(0x88ccff);

  const ambientlight = new THREE.AmbientLight(0x6688cc);
  scene.add(ambientlight);

  const fillLight1 = new THREE.DirectionalLight(0xff9999, 0.5);
  fillLight1.position.set(- 1, 1, 2);
  scene.add(fillLight1);

  const fillLight2 = new THREE.DirectionalLight(0x8888ff, 0.2);
  fillLight2.position.set(0, - 1, 0);
  scene.add(fillLight2);

  const directionalLight = new THREE.DirectionalLight(0xffffaa, 1.2);
  directionalLight.position.set(- 5, 25, - 1);
  directionalLight.castShadow = true;
  directionalLight.shadow.camera.near = 0.01;
  directionalLight.shadow.camera.far = 500;
  directionalLight.shadow.camera.right = 30;
  directionalLight.shadow.camera.left = - 30;
  directionalLight.shadow.camera.top = 30;
  directionalLight.shadow.camera.bottom = - 30;
  directionalLight.shadow.mapSize.width = 1024;
  directionalLight.shadow.mapSize.height = 1024;
  directionalLight.shadow.radius = 4;
  directionalLight.shadow.bias = - 0.00006;
  scene.add(directionalLight);

  return scene
}