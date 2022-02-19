import { playerCollider, playerVelocity } from "../index";

const vector1 = new THREE.Vector3();
const vector2 = new THREE.Vector3();
const vector3 = new THREE.Vector3();

export const playerSphereCollision = (sphere) => {

  const center = vector1.addVectors(playerCollider.start, playerCollider.end).multiplyScalar(0.5);

  const sphere_center = sphere.collider.center;

  const r = playerCollider.radius + sphere.collider.radius;
  const r2 = r * r;

  // approximation: player = 3 spheres

  for (const point of [playerCollider.start, playerCollider.end, center]) {

    const d2 = point.distanceToSquared(sphere_center);

    if (d2 < r2) {

      const normal = vector1.subVectors(point, sphere_center).normalize();
      const v1 = vector2.copy(normal).multiplyScalar(normal.dot(playerVelocity));
      const v2 = vector3.copy(normal).multiplyScalar(normal.dot(sphere.velocity));

      playerVelocity.add(v2).sub(v1);
      sphere.velocity.add(v1).sub(v2);

      const d = (r - Math.sqrt(d2)) / 2;
      sphere_center.addScaledVector(normal, - d);

    }

  }

}