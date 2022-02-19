import { camera } from '../player/player';
import { sensitivity } from './commands/settingsHandler';
import * as THREE from 'three';

const _PI_2 = Math.PI / 2;

export const playerMouseMove = (): void => {
  // Mouse movement
  document.body.addEventListener('mousemove', (event) => {
    if (document.pointerLockElement === document.body) {
      handleMove(event.movementX, event.movementY);
    }
  });

  function handleMove(movementX: number, movementY: number) {
    // Rotation speed
    const speed = 2000 / sensitivity;

    // Set new camera rotation
    camera.rotation.y -= movementX / speed;
    camera.rotation.x -= movementY / speed;

    // Limit camera rotation to be 180 degrees
    camera.rotation.x = (<any>THREE).Math.clamp(
      camera.rotation.x,
      -_PI_2,
      _PI_2
    );
  }
};
