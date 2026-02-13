import * as THREE from 'three';

const mat = (color) => new THREE.MeshLambertMaterial({ color });

function addAccessory(group, accessory) {
  if (accessory === 'sunglasses') {
    const glassMat = mat('#111111');
    const frameMat = mat('#333333');
    const bridge = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.04, 0.04), frameMat);
    bridge.position.set(0, 2.2, 0.38);
    group.add(bridge);
    [-0.15, 0.15].forEach((x) => {
      const lens = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.14, 0.04), glassMat);
      lens.position.set(x, 2.2, 0.38);
      group.add(lens);
    });
  } else if (accessory === 'bow') {
    const bowMat = mat('#FF69B4');
    const bowCenter = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.1, 0.1), bowMat);
    bowCenter.position.set(0.3, 2.5, 0);
    group.add(bowCenter);
    [-0.12, 0.12].forEach((dx) => {
      const wing = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.2, 0.08), bowMat);
      wing.position.set(0.3 + dx, 2.5, 0);
      group.add(wing);
    });
  } else if (accessory === 'crown') {
    const crownMat = mat('#FFD700');
    const crownBase = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.15, 0.6), crownMat);
    crownBase.position.y = 2.6;
    group.add(crownBase);
    [-0.2, 0, 0.2].forEach((x) => {
      const spike = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.15, 0.1), crownMat);
      spike.position.set(x, 2.75, 0.2);
      group.add(spike);
    });
  } else if (accessory === 'headband') {
    const hbMat = mat('#FF0000');
    const band = new THREE.Mesh(new THREE.BoxGeometry(0.75, 0.1, 0.75), hbMat);
    band.position.y = 2.45;
    group.add(band);
  }
}

export function createBlockyCharacter(charData) {
  const group = new THREE.Group();

  // Head
  const head = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.7, 0.7), mat(charData.skin));
  head.position.y = 2.15;
  head.castShadow = true;
  group.add(head);

  // Eyes
  const eyeGeo = new THREE.BoxGeometry(0.12, 0.12, 0.05);
  const eyeMat = mat('#111111');
  const eyeWhiteGeo = new THREE.BoxGeometry(0.18, 0.18, 0.04);
  const eyeWhiteMat = mat('#FFFFFF');
  [-0.15, 0.15].forEach((x) => {
    const eyeWhite = new THREE.Mesh(eyeWhiteGeo, eyeWhiteMat);
    eyeWhite.position.set(x, 2.2, 0.35);
    group.add(eyeWhite);
    const eye = new THREE.Mesh(eyeGeo, eyeMat);
    eye.position.set(x, 2.18, 0.37);
    group.add(eye);
  });

  // Mouth
  const mouth = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.06, 0.04), mat('#333333'));
  mouth.position.set(0, 2.0, 0.36);
  group.add(mouth);

  // Hair
  const hairMat = mat(charData.hair);
  const hairTop = new THREE.Mesh(new THREE.BoxGeometry(0.75, 0.2, 0.75), hairMat);
  hairTop.position.y = 2.55;
  hairTop.castShadow = true;
  group.add(hairTop);
  const hairBack = new THREE.Mesh(new THREE.BoxGeometry(0.75, 0.5, 0.2), hairMat);
  hairBack.position.set(0, 2.3, -0.35);
  group.add(hairBack);
  const hairSide1 = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.4, 0.6), hairMat);
  hairSide1.position.set(-0.38, 2.3, 0);
  group.add(hairSide1);
  const hairSide2 = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.4, 0.6), hairMat);
  hairSide2.position.set(0.38, 2.3, 0);
  group.add(hairSide2);

  // Hat
  if (charData.hat !== 'none') {
    const hatMat = mat(charData.hat);
    const hatBrim = new THREE.Mesh(new THREE.BoxGeometry(0.95, 0.08, 0.95), hatMat);
    hatBrim.position.y = 2.55;
    group.add(hatBrim);
    const hatTop = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.35, 0.7), hatMat);
    hatTop.position.y = 2.75;
    hatTop.castShadow = true;
    group.add(hatTop);
  }

  // Accessory
  addAccessory(group, charData.accessory);

  // Torso
  const torso = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.9, 0.5), mat(charData.shirt));
  torso.position.y = 1.35;
  torso.castShadow = true;
  group.add(torso);

  // Arms with pivots
  const armGeo = new THREE.BoxGeometry(0.25, 0.8, 0.25);

  const leftArm = new THREE.Mesh(armGeo, mat(charData.shirt));
  leftArm.castShadow = true;
  leftArm.position.y = -0.4;
  const leftArmPivot = new THREE.Group();
  leftArmPivot.position.set(-0.525, 1.75, 0);
  leftArmPivot.name = 'leftArmPivot';
  leftArmPivot.add(leftArm);
  group.add(leftArmPivot);

  const rightArm = new THREE.Mesh(armGeo, mat(charData.shirt));
  rightArm.castShadow = true;
  rightArm.position.y = -0.4;
  const rightArmPivot = new THREE.Group();
  rightArmPivot.position.set(0.525, 1.75, 0);
  rightArmPivot.name = 'rightArmPivot';
  rightArmPivot.add(rightArm);
  group.add(rightArmPivot);

  // Hands
  const handGeo = new THREE.BoxGeometry(0.2, 0.2, 0.2);
  const handMat = mat(charData.skin);
  const leftHand = new THREE.Mesh(handGeo, handMat);
  leftHand.position.y = -0.8;
  leftArmPivot.add(leftHand);
  const rightHand = new THREE.Mesh(handGeo, handMat);
  rightHand.position.y = -0.8;
  rightArmPivot.add(rightHand);

  // Legs with pivots
  const legGeo = new THREE.BoxGeometry(0.35, 0.8, 0.4);

  const leftLeg = new THREE.Mesh(legGeo, mat(charData.pants));
  leftLeg.castShadow = true;
  leftLeg.position.y = -0.4;
  const leftLegPivot = new THREE.Group();
  leftLegPivot.position.set(-0.2, 0.9, 0);
  leftLegPivot.name = 'leftLegPivot';
  leftLegPivot.add(leftLeg);
  group.add(leftLegPivot);

  const rightLeg = new THREE.Mesh(legGeo, mat(charData.pants));
  rightLeg.castShadow = true;
  rightLeg.position.y = -0.4;
  const rightLegPivot = new THREE.Group();
  rightLegPivot.position.set(0.2, 0.9, 0);
  rightLegPivot.name = 'rightLegPivot';
  rightLegPivot.add(rightLeg);
  group.add(rightLegPivot);

  // Shoes
  const shoeMat = mat('#222222');
  const shoeGeo = new THREE.BoxGeometry(0.36, 0.15, 0.5);
  const leftShoe = new THREE.Mesh(shoeGeo, shoeMat);
  leftShoe.position.set(0, -0.85, 0.05);
  leftLegPivot.add(leftShoe);
  const rightShoe = new THREE.Mesh(shoeGeo, shoeMat);
  rightShoe.position.set(0, -0.85, 0.05);
  rightLegPivot.add(rightShoe);

  group.position.x = charData.x;
  group.position.z = charData.z || 0;
  group.userData = { charData };

  return group;
}
