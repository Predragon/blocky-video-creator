import * as THREE from 'three';

export function buildEnvironment(scene, sceneConfig) {
  // Sky
  scene.background = new THREE.Color(sceneConfig.sky);
  scene.fog = new THREE.Fog(sceneConfig.sky, 15, 30);

  // Lighting
  const ambient = new THREE.AmbientLight(0xffffff, 0.6);
  scene.add(ambient);

  const dir = new THREE.DirectionalLight(0xffffff, 0.8);
  dir.position.set(5, 10, 5);
  dir.castShadow = true;
  dir.shadow.mapSize.width = 1024;
  dir.shadow.mapSize.height = 1024;
  scene.add(dir);

  const isNight = sceneConfig.sky === '#0a0a2e';

  if (isNight) {
    const moonLight = new THREE.PointLight(0x6666ff, 0.5, 20);
    moonLight.position.set(-5, 8, -5);
    scene.add(moonLight);
  }

  // Ground
  const ground = new THREE.Mesh(
    new THREE.PlaneGeometry(40, 40),
    new THREE.MeshLambertMaterial({ color: sceneConfig.ground })
  );
  ground.rotation.x = -Math.PI / 2;
  ground.receiveShadow = true;
  scene.add(ground);

  // Water
  if (sceneConfig.water) {
    const water = new THREE.Mesh(
      new THREE.PlaneGeometry(40, 20),
      new THREE.MeshLambertMaterial({ color: '#2196F3', transparent: true, opacity: 0.6 })
    );
    water.rotation.x = -Math.PI / 2;
    water.position.set(0, 0.01, -12);
    scene.add(water);
  }

  // Trees
  if (sceneConfig.trees) {
    for (let i = 0; i < 12; i++) {
      const treeGroup = new THREE.Group();
      const trunk = new THREE.Mesh(
        new THREE.BoxGeometry(0.4, 1.5, 0.4),
        new THREE.MeshLambertMaterial({ color: '#8B4513' })
      );
      trunk.position.y = 0.75;
      trunk.castShadow = true;
      treeGroup.add(trunk);

      const leaves = new THREE.Mesh(
        new THREE.BoxGeometry(1.5, 1.5, 1.5),
        new THREE.MeshLambertMaterial({ color: '#228B22' })
      );
      leaves.position.y = 2.2;
      leaves.castShadow = true;
      treeGroup.add(leaves);

      const angle = (i / 12) * Math.PI * 2;
      const radius = 5 + Math.random() * 6;
      treeGroup.position.set(Math.cos(angle) * radius, 0, Math.sin(angle) * radius);
      treeGroup.scale.setScalar(0.7 + Math.random() * 0.6);
      scene.add(treeGroup);
    }
  }

  // Buildings
  if (sceneConfig.buildings) {
    for (let i = 0; i < 8; i++) {
      const height = 2 + Math.random() * 5;
      const width = 1 + Math.random() * 1.5;
      const building = new THREE.Mesh(
        new THREE.BoxGeometry(width, height, width),
        new THREE.MeshLambertMaterial({ color: isNight ? '#1a1a3e' : '#888888' })
      );
      const angle = (i / 8) * Math.PI * 2;
      const radius = 6 + Math.random() * 4;
      building.position.set(Math.cos(angle) * radius, height / 2, Math.sin(angle) * radius);
      building.castShadow = true;
      scene.add(building);

      if (isNight) {
        for (let wy = 0; wy < Math.floor(height); wy++) {
          for (let wx = 0; wx < 2; wx++) {
            if (Math.random() > 0.4) {
              const win = new THREE.Mesh(
                new THREE.BoxGeometry(0.2, 0.25, 0.01),
                new THREE.MeshBasicMaterial({ color: '#FFD700' })
              );
              win.position.set(
                building.position.x + (wx - 0.5) * 0.5,
                0.5 + wy * 0.8,
                building.position.z + width / 2 + 0.01
              );
              scene.add(win);
            }
          }
        }
      }
    }
  }
}
