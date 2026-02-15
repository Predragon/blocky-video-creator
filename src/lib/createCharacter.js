import * as THREE from 'three';

const mat = (color) => new THREE.MeshLambertMaterial({ color });

// ── Accessories (unchanged) ──

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

// ── Eyes (anime-style with colored iris + highlight) ──

function buildEyes(group, charData) {
  const eyeColor = charData.eyeColor || '#111111';
  [-0.15, 0.15].forEach((x) => {
    const sclera = new THREE.Mesh(new THREE.BoxGeometry(0.20, 0.22, 0.04), mat('#FFFFFF'));
    sclera.position.set(x, 2.18, 0.34);
    group.add(sclera);

    const iris = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.16, 0.04), mat(eyeColor));
    iris.position.set(x, 2.16, 0.355);
    group.add(iris);

    const pupil = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.10, 0.04), mat('#111111'));
    pupil.position.set(x, 2.16, 0.37);
    group.add(pupil);

    const glint = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.04, 0.04), mat('#FFFFFF'));
    glint.position.set(x + 0.03, 2.20, 0.385);
    group.add(glint);
  });
}

// ── Eyebrows (expression-driven) ──

function buildEyebrows(group, charData) {
  const expression = charData.expression || 'neutral';
  const browMat = mat(charData.hair || '#1a1a1a');
  [-0.15, 0.15].forEach((x, i) => {
    const brow = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.04, 0.04), browMat);
    brow.position.set(x, 2.34, 0.36);
    switch (expression) {
      case 'angry':
        brow.rotation.z = i === 0 ? -0.3 : 0.3;
        brow.position.y = 2.32;
        break;
      case 'sad':
        brow.rotation.z = i === 0 ? 0.3 : -0.3;
        brow.position.y = 2.32;
        break;
      case 'surprised':
        brow.position.y = 2.38;
        break;
      case 'happy':
        brow.rotation.z = i === 0 ? 0.15 : -0.15;
        break;
    }
    group.add(brow);
  });
}

// ── Mouth (expression-driven shapes) ──

function buildMouth(group, charData) {
  const expression = charData.expression || 'neutral';
  const mouthMat = mat('#333333');
  switch (expression) {
    case 'happy': {
      const bar = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.04, 0.04), mouthMat);
      bar.position.set(0, 1.98, 0.36);
      group.add(bar);
      const lc = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.04, 0.04), mouthMat);
      lc.position.set(-0.10, 2.00, 0.36);
      lc.rotation.z = 0.5;
      group.add(lc);
      const rc = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.04, 0.04), mouthMat);
      rc.position.set(0.10, 2.00, 0.36);
      rc.rotation.z = -0.5;
      group.add(rc);
      break;
    }
    case 'angry': {
      const bar = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.05, 0.04), mouthMat);
      bar.position.set(0, 2.00, 0.36);
      group.add(bar);
      const lc = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.04, 0.04), mouthMat);
      lc.position.set(-0.09, 1.98, 0.36);
      lc.rotation.z = -0.5;
      group.add(lc);
      const rc = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.04, 0.04), mouthMat);
      rc.position.set(0.09, 1.98, 0.36);
      rc.rotation.z = 0.5;
      group.add(rc);
      break;
    }
    case 'sad': {
      const bar = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.04, 0.04), mouthMat);
      bar.position.set(0, 1.97, 0.36);
      group.add(bar);
      const lc = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.04, 0.04), mouthMat);
      lc.position.set(-0.09, 1.99, 0.36);
      lc.rotation.z = -0.4;
      group.add(lc);
      const rc = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.04, 0.04), mouthMat);
      rc.position.set(0.09, 1.99, 0.36);
      rc.rotation.z = 0.4;
      group.add(rc);
      break;
    }
    case 'surprised': {
      const mouth = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.10, 0.04), mouthMat);
      mouth.position.set(0, 1.96, 0.36);
      group.add(mouth);
      break;
    }
    default: {
      const mouth = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.05, 0.04), mouthMat);
      mouth.position.set(0, 2.0, 0.36);
      group.add(mouth);
    }
  }
}

// ── Hair Styles ──

function buildHairDefault(group, hairMat) {
  const top = new THREE.Mesh(new THREE.BoxGeometry(0.75, 0.2, 0.75), hairMat);
  top.position.y = 2.55; top.castShadow = true;
  group.add(top);
  const back = new THREE.Mesh(new THREE.BoxGeometry(0.75, 0.5, 0.2), hairMat);
  back.position.set(0, 2.3, -0.35);
  group.add(back);
  [-0.38, 0.38].forEach((x) => {
    const side = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.4, 0.6), hairMat);
    side.position.set(x, 2.3, 0);
    group.add(side);
  });
}

function buildHairBob(group, hairMat) {
  const top = new THREE.Mesh(new THREE.BoxGeometry(0.76, 0.18, 0.76), hairMat);
  top.position.y = 2.56; top.castShadow = true;
  group.add(top);
  const back = new THREE.Mesh(new THREE.BoxGeometry(0.76, 0.7, 0.18), hairMat);
  back.position.set(0, 2.20, -0.36);
  group.add(back);
  [-0.39, 0.39].forEach((x) => {
    const side = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.65, 0.65), hairMat);
    side.position.set(x, 2.22, 0);
    group.add(side);
  });
  const bangs = new THREE.Mesh(new THREE.BoxGeometry(0.60, 0.12, 0.08), hairMat);
  bangs.position.set(0, 2.40, 0.36);
  group.add(bangs);
}

function buildHairPonytail(group, hairMat) {
  const top = new THREE.Mesh(new THREE.BoxGeometry(0.75, 0.20, 0.75), hairMat);
  top.position.y = 2.55; top.castShadow = true;
  group.add(top);
  [-0.38, 0.38].forEach((x) => {
    const side = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.30, 0.55), hairMat);
    side.position.set(x, 2.35, 0);
    group.add(side);
  });
  const tiePoint = new THREE.Mesh(new THREE.BoxGeometry(0.25, 0.20, 0.20), hairMat);
  tiePoint.position.set(0, 2.50, -0.38);
  group.add(tiePoint);
  const tail1 = new THREE.Mesh(new THREE.BoxGeometry(0.20, 0.30, 0.15), hairMat);
  tail1.position.set(0, 2.28, -0.45);
  group.add(tail1);
  const tail2 = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.30, 0.14), hairMat);
  tail2.position.set(0, 2.00, -0.48);
  group.add(tail2);
  const tail3 = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.25, 0.12), hairMat);
  tail3.position.set(0, 1.75, -0.50);
  group.add(tail3);
  const bangs = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.10, 0.08), hairMat);
  bangs.position.set(0, 2.42, 0.36);
  group.add(bangs);
}

function buildHairBun(group, hairMat) {
  const top = new THREE.Mesh(new THREE.BoxGeometry(0.75, 0.18, 0.75), hairMat);
  top.position.y = 2.55; top.castShadow = true;
  group.add(top);
  [-0.38, 0.38].forEach((x) => {
    const side = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.30, 0.55), hairMat);
    side.position.set(x, 2.35, 0);
    group.add(side);
  });
  const back = new THREE.Mesh(new THREE.BoxGeometry(0.70, 0.40, 0.16), hairMat);
  back.position.set(0, 2.35, -0.35);
  group.add(back);
  const bunBase = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.22, 0.28), hairMat);
  bunBase.position.set(0, 2.72, -0.05);
  group.add(bunBase);
  const bunTop = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.14, 0.22), hairMat);
  bunTop.position.set(0, 2.82, -0.05);
  group.add(bunTop);
  // Wispy side pieces
  const wisp1 = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.18, 0.06), hairMat);
  wisp1.position.set(-0.15, 2.68, 0.05); wisp1.rotation.z = 0.3;
  group.add(wisp1);
  const wisp2 = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.18, 0.06), hairMat);
  wisp2.position.set(0.15, 2.68, 0.05); wisp2.rotation.z = -0.3;
  group.add(wisp2);
}

function buildHairTwinBuns(group, hairMat) {
  const top = new THREE.Mesh(new THREE.BoxGeometry(0.75, 0.18, 0.75), hairMat);
  top.position.y = 2.55; top.castShadow = true;
  group.add(top);
  [-0.38, 0.38].forEach((x) => {
    const side = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.35, 0.55), hairMat);
    side.position.set(x, 2.30, 0);
    group.add(side);
  });
  const back = new THREE.Mesh(new THREE.BoxGeometry(0.70, 0.40, 0.16), hairMat);
  back.position.set(0, 2.35, -0.35);
  group.add(back);
  [-0.25, 0.25].forEach((x) => {
    const bunOuter = new THREE.Mesh(new THREE.BoxGeometry(0.26, 0.26, 0.26), hairMat);
    bunOuter.position.set(x, 2.72, 0);
    group.add(bunOuter);
    const bunInner = new THREE.Mesh(new THREE.BoxGeometry(0.20, 0.16, 0.20), hairMat);
    bunInner.position.set(x, 2.82, 0);
    group.add(bunInner);
  });
  const bangs = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.10, 0.08), hairMat);
  bangs.position.set(0, 2.42, 0.36);
  group.add(bangs);
}

function buildHairTwinTails(group, hairMat) {
  const top = new THREE.Mesh(new THREE.BoxGeometry(0.75, 0.18, 0.75), hairMat);
  top.position.y = 2.55; top.castShadow = true;
  group.add(top);
  const back = new THREE.Mesh(new THREE.BoxGeometry(0.70, 0.35, 0.16), hairMat);
  back.position.set(0, 2.35, -0.35);
  group.add(back);
  [-0.40, 0.40].forEach((x) => {
    const tie = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.18, 0.20), hairMat);
    tie.position.set(x, 2.40, 0);
    group.add(tie);
    const t1 = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.35, 0.14), hairMat);
    t1.position.set(x * 1.05, 2.10, 0);
    group.add(t1);
    const t2 = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.30, 0.12), hairMat);
    t2.position.set(x * 1.05, 1.80, 0);
    group.add(t2);
    const t3 = new THREE.Mesh(new THREE.BoxGeometry(0.10, 0.15, 0.10), hairMat);
    t3.position.set(x * 1.05, 1.58, 0);
    group.add(t3);
  });
  const bangs = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.12, 0.08), hairMat);
  bangs.position.set(0, 2.42, 0.36);
  group.add(bangs);
}

function buildHair(group, charData) {
  const hairMat = mat(charData.hair);
  switch (charData.hairStyle || 'default') {
    case 'bob': buildHairBob(group, hairMat); break;
    case 'ponytail': buildHairPonytail(group, hairMat); break;
    case 'bun': buildHairBun(group, hairMat); break;
    case 'twin_buns': buildHairTwinBuns(group, hairMat); break;
    case 'twin_tails': buildHairTwinTails(group, hairMat); break;
    default: buildHairDefault(group, hairMat); break;
  }
}

// ── Torso (with optional vest for uniform) ──

function buildTorso(group, charData) {
  const clothing = charData.clothing || 'pants';
  const torso = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.9, 0.5), mat(charData.shirt));
  torso.position.y = 1.35;
  torso.castShadow = true;
  group.add(torso);

  if (clothing === 'uniform') {
    const vestFront = new THREE.Mesh(new THREE.BoxGeometry(0.82, 0.65, 0.26), mat('#1a1a1a'));
    vestFront.position.set(0, 1.42, 0.13);
    group.add(vestFront);
    const vestBack = new THREE.Mesh(new THREE.BoxGeometry(0.82, 0.65, 0.26), mat('#1a1a1a'));
    vestBack.position.set(0, 1.42, -0.13);
    group.add(vestBack);
  }
}

// ── Legs (pants, skirt, or uniform with socks) ──

function buildLegs(group, charData) {
  const clothing = charData.clothing || 'pants';
  const socksColor = charData.socks || 'none';
  const isSkirt = clothing === 'skirt' || clothing === 'uniform';

  if (isSkirt) {
    // Skirt box
    const skirt = new THREE.Mesh(new THREE.BoxGeometry(0.85, 0.30, 0.55), mat(charData.pants));
    skirt.position.y = 0.95;
    skirt.castShadow = true;
    group.add(skirt);

    const legColor = charData.skin;
    const legGeo = new THREE.BoxGeometry(0.28, 0.35, 0.30);

    // Left leg pivot
    const leftLeg = new THREE.Mesh(legGeo, mat(legColor));
    leftLeg.castShadow = true;
    leftLeg.position.y = -0.22;
    const leftLegPivot = new THREE.Group();
    leftLegPivot.position.set(-0.2, 0.9, 0);
    leftLegPivot.name = 'leftLegPivot';
    leftLegPivot.add(leftLeg);
    if (socksColor !== 'none') {
      const sock = new THREE.Mesh(new THREE.BoxGeometry(0.29, 0.35, 0.31), mat(socksColor));
      sock.position.y = -0.55;
      leftLegPivot.add(sock);
    }
    const leftShoe = new THREE.Mesh(new THREE.BoxGeometry(0.30, 0.15, 0.40), mat('#222222'));
    leftShoe.position.set(0, -0.85, 0.05);
    leftLegPivot.add(leftShoe);
    group.add(leftLegPivot);

    // Right leg pivot
    const rightLeg = new THREE.Mesh(legGeo, mat(legColor));
    rightLeg.castShadow = true;
    rightLeg.position.y = -0.22;
    const rightLegPivot = new THREE.Group();
    rightLegPivot.position.set(0.2, 0.9, 0);
    rightLegPivot.name = 'rightLegPivot';
    rightLegPivot.add(rightLeg);
    if (socksColor !== 'none') {
      const sock = new THREE.Mesh(new THREE.BoxGeometry(0.29, 0.35, 0.31), mat(socksColor));
      sock.position.y = -0.55;
      rightLegPivot.add(sock);
    }
    const rightShoe = new THREE.Mesh(new THREE.BoxGeometry(0.30, 0.15, 0.40), mat('#222222'));
    rightShoe.position.set(0, -0.85, 0.05);
    rightLegPivot.add(rightShoe);
    group.add(rightLegPivot);
  } else {
    // Standard pants
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

    // Socks for pants mode
    if (socksColor !== 'none') {
      const sockGeo = new THREE.BoxGeometry(0.36, 0.20, 0.41);
      const leftSock = new THREE.Mesh(sockGeo, mat(socksColor));
      leftSock.position.set(0, -0.72, 0);
      leftLegPivot.add(leftSock);
      const rightSock = new THREE.Mesh(sockGeo, mat(socksColor));
      rightSock.position.set(0, -0.72, 0);
      rightLegPivot.add(rightSock);
    }

    // Shoes
    const shoeMat = mat('#222222');
    const shoeGeo = new THREE.BoxGeometry(0.36, 0.15, 0.5);
    const leftShoe = new THREE.Mesh(shoeGeo, shoeMat);
    leftShoe.position.set(0, -0.85, 0.05);
    leftLegPivot.add(leftShoe);
    const rightShoe = new THREE.Mesh(shoeGeo, shoeMat);
    rightShoe.position.set(0, -0.85, 0.05);
    rightLegPivot.add(rightShoe);
  }
}

// ── Main Character Builder ──

export function createBlockyCharacter(charData) {
  const group = new THREE.Group();

  // Head
  const head = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.7, 0.7), mat(charData.skin));
  head.position.y = 2.15;
  head.castShadow = true;
  group.add(head);

  // Face
  buildEyes(group, charData);
  buildEyebrows(group, charData);
  buildMouth(group, charData);

  // Hair
  buildHair(group, charData);

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
  buildTorso(group, charData);

  // Arms with pivots
  const armGeo = new THREE.BoxGeometry(0.25, 0.8, 0.25);
  const armColor = charData.shirt;

  const leftArm = new THREE.Mesh(armGeo, mat(armColor));
  leftArm.castShadow = true;
  leftArm.position.y = -0.4;
  const leftArmPivot = new THREE.Group();
  leftArmPivot.position.set(-0.525, 1.75, 0);
  leftArmPivot.name = 'leftArmPivot';
  leftArmPivot.add(leftArm);
  group.add(leftArmPivot);

  const rightArm = new THREE.Mesh(armGeo, mat(armColor));
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

  // Legs, shoes, socks
  buildLegs(group, charData);

  group.position.x = charData.x;
  group.position.z = charData.z || 0;
  group.userData = { charData };

  return group;
}
