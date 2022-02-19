import { camera, playerCollider } from "../player/player";

export const teleportPlayerIfOob = () => {

  if (camera.position.y <= - 5) {

    playerCollider.start.set(0, 0.35, 0);
    playerCollider.end.set(0, 1, 0);
    playerCollider.radius = 0.35;
    camera.position.copy(playerCollider.end);
    camera.rotation.set(0, 0, 0);

  }

}