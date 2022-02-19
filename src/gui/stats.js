
import Stats from 'three/examples/jsm/libs/stats.module.js';

const createStats = () => {
  const container = document.querySelector("#container")
  // Stats
  const stats = new Stats();
  stats.domElement.style.position = 'absolute';
  stats.domElement.style.top = '0px';
  container.appendChild(stats.domElement);

  return stats;
}

export const stats = createStats();