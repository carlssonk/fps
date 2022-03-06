import {
  player,
  playerOnFloor,
  playerVelocity,
  playerCollider,
  camera,
  viewmodel
} from './player';
import { gameLoop } from '../index';
import {
  gravity,
  damping as dampingValue
} from '../input/commands/settingsHandler';
import { worldOctree } from '../scene/loadAsset';
import { assets } from '../game';

export const updatePlayer = (deltaTime: number) => {
  let damping = Math.exp(-dampingValue * deltaTime) - 1;

  if (!playerOnFloor) {
    playerVelocity.y -= gravity * deltaTime;

    // Air resistence y
    damping *= 0.02;
  }

  playerVelocity.addScaledVector(playerVelocity, damping);

  const deltaPosition = playerVelocity.clone().multiplyScalar(deltaTime);

  playerCollider.translate(deltaPosition);

  playerCollisions();

  camera.position.copy(playerCollider.end);

  // Update gun movement
  viewmodelBobbing();
};

function playerCollisions() {
  const result = worldOctree.capsuleIntersect(playerCollider);

  player.playerOnFloor = false;

  if (result) {
    player.playerOnFloor = result.normal.y > 0;

    if (!playerOnFloor) {
      playerVelocity.addScaledVector(
        result.normal,
        -result.normal.dot(playerVelocity)
      );
    }

    playerCollider.translate(result.normal.multiplyScalar(result.depth));
  }
}

const viewmodelBobbing = () => {
  const avgVelocity = Math.abs(playerVelocity.x) + Math.abs(playerVelocity.z);
  const offset = avgVelocity / 1000;
  const weapon = viewmodel;

  // View offset
  weapon.position.set(
    weapon.defaultPosition.x + offset,
    weapon.defaultPosition.y - offset,
    weapon.defaultPosition.z + offset
  );

  // View bobbing
  if (avgVelocity > 5) {
    weapon.position.z =
      weapon.position.z + Math.sin(gameLoop.elapsedTime / 75) / 500;
  } else if (avgVelocity > 1) {
    weapon.position.z =
      weapon.position.z + Math.sin(gameLoop.elapsedTime / 150) / 500;
  }
};
