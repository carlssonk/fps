import { camera, viewmodel } from '../player/player';
import { sensitivity } from './commands/settingsHandler';
import * as THREE from 'three';
import { assets } from '../game';

const _PI_2 = Math.PI / 2;

// export const mouseTime = 0;
let isShooting = false;
let fireRate = 0.12;
let automatic = false;
let shootDelay = 0.0;

const playerMouseControlsHandler = (): any => {
  document.body.addEventListener('mousemove', (event) => {
    if (document.pointerLockElement === document.body) {
      handleMove(event.movementX, event.movementY);
    }
  });

  document.body.addEventListener('mousedown', (event) => {
    if (event.button === 0) {
      isShooting = true;
    }
  });

  document.body.addEventListener('mouseup', (event) => {
    if (event.button === 0) {
      isShooting = false;
    }
  });

  return {
    Update(deltaTime: number) {
      if (!isShooting)
        return (shootDelay = Math.max(0.0, shootDelay - deltaTime));

      if (!automatic) isShooting = false;

      if (shootDelay <= 0.0) {
        //Shoot

        viewmodel.weapon.fire();

        shootDelay = fireRate;
      }

      shootDelay = Math.max(0.0, shootDelay - deltaTime);
    }
  };
};

const handleMove = (movementX: number, movementY: number) => {
  // Rotation speed
  const speed = 2000 / sensitivity;

  // Set new camera rotation
  camera.rotation.y -= movementX / speed;
  camera.rotation.x -= movementY / speed;

  // Limit camera rotation to be 180 degrees
  camera.rotation.x = (<any>THREE).Math.clamp(camera.rotation.x, -_PI_2, _PI_2);
};

export const playerMouseControls = playerMouseControlsHandler();
