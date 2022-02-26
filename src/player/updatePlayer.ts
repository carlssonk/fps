import {
  player,
  playerOnFloor,
  playerVelocity,
  playerCollider,
  camera
} from './player';
import { gravity } from '../input/commands/settingsHandler';
import { worldOctree } from '../scene/mapLoader';

// let frames = 0;

export const updatePlayer = (deltaTime: number) => {
  // console.log(playerCollider.start.z);
  // console.log(playerCollider.end.z);

  let damping = Math.exp(-20 * deltaTime) - 1;

  if (!playerOnFloor) {
    playerVelocity.y -= gravity * deltaTime;

    // small air resistance
    damping *= 0.2;
  }

  playerVelocity.addScaledVector(playerVelocity, damping);

  // frames++;

  // if (frames < 100) {
  //   playerVelocity.set(0, 0, 0);
  //   playerCollider.end.z = -5;
  //   camera.position.z = -5;
  // }

  const deltaPosition = playerVelocity.clone().multiplyScalar(deltaTime);

  playerCollider.translate(deltaPosition);

  playerCollisions();

  camera.position.copy(playerCollider.end);
};

function playerCollisions() {
  const result = worldOctree.capsuleIntersect(playerCollider);
  // console.log(result);

  player.playerOnFloor = false;

  if (result) {
    player.playerOnFloor = result.normal.y > 0;

    // console.log(result.normal.y > 0);

    if (!playerOnFloor) {
      playerVelocity.addScaledVector(
        result.normal,
        -result.normal.dot(playerVelocity)
      );
    }

    playerCollider.translate(result.normal.multiplyScalar(result.depth));
  }
}
