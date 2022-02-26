import {
  player,
  playerOnFloor,
  playerVelocity,
  playerCollider,
  camera
} from './player';
import {
  gravity,
  damping as dampingValue
} from '../input/commands/settingsHandler';
import { worldOctree } from '../scene/mapLoader';

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
