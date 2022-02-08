import { playerOnFloor, keyStates, playerVelocity, camera, playerDirection } from "../../main";


export const controls = (deltaTime) => {


  // gives a bit of air control
  const speedDelta = deltaTime * (playerOnFloor ? 100 : 20);

  if (keyStates['KeyW']) {

    playerVelocity.add(getForwardVector().multiplyScalar(speedDelta));

  }

  if (keyStates['KeyS']) {

    playerVelocity.add(getForwardVector().multiplyScalar(- speedDelta));

  }

  if (keyStates['KeyA']) {

    playerVelocity.add(getSideVector().multiplyScalar(- speedDelta));

  }

  if (keyStates['KeyD']) {

    playerVelocity.add(getSideVector().multiplyScalar(speedDelta));

  }

  if (playerOnFloor) {

    if (keyStates['Space']) {

      playerVelocity.y = 15;

    }

  }


}

function getForwardVector() {

  camera.getWorldDirection(playerDirection);
  playerDirection.y = 0;
  playerDirection.normalize();

  return playerDirection;

}

function getSideVector() {

  camera.getWorldDirection(playerDirection);
  playerDirection.y = 0;
  playerDirection.normalize();
  playerDirection.cross(camera.up);

  return playerDirection;

}