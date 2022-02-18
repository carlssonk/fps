import { camera, sensetivity } from "../index";
import * as THREE from 'three';

const _PI_2 = Math.PI / 2;

export const playerMouseMove = () => {

  // Mouse movement
  document.body.addEventListener('mousemove', (event) => {

    if (document.pointerLockElement === document.body) {

      handleMove(event.movementX, event.movementY);

    }

  });


  function handleMove(movementX, movementY) {

    // Rotation speed
    const speed = 2000 / sensetivity;

    // Set new camera rotation
    camera.rotation.y -= movementX / speed;
    camera.rotation.x -= movementY / speed;

    // Limit camera rotation to be 180 degrees
    camera.rotation.x = THREE.Math.clamp(camera.rotation.x, -_PI_2, _PI_2);

  }

}


