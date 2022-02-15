import { playerSphereCollision } from "../collision/playerSphereCollision"
import { spheresCollisions } from "../collision/spheresCollisions"
import { spheres, worldOctree, GRAVITY } from "../index";

export const updateSpheres = (deltaTime) => {

  spheres.forEach(sphere => {

    sphere.collider.center.addScaledVector(sphere.velocity, deltaTime);

    const result = worldOctree.sphereIntersect(sphere.collider);

    if (result) {

      sphere.velocity.addScaledVector(result.normal, - result.normal.dot(sphere.velocity) * 1.5);
      sphere.collider.center.add(result.normal.multiplyScalar(result.depth));

    } else {

      sphere.velocity.y -= GRAVITY * deltaTime;

    }

    const damping = Math.exp(- 1.5 * deltaTime) - 1;
    sphere.velocity.addScaledVector(sphere.velocity, damping);

    playerSphereCollision(sphere);

  });

  spheresCollisions();

  for (const sphere of spheres) {

    sphere.mesh.position.copy(sphere.collider.center);

  }

}