export function animateCharacter(group, time) {
  const anim = group.userData.charData.animation;
  const la = group.getObjectByName('leftArmPivot');
  const ra = group.getObjectByName('rightArmPivot');
  const ll = group.getObjectByName('leftLegPivot');
  const rl = group.getObjectByName('rightLegPivot');
  if (!la || !ra || !ll || !rl) return;

  const t = time * 2;

  // Reset z-rotation each frame
  ra.rotation.z = 0;

  switch (anim) {
    case 'idle':
      la.rotation.x = Math.sin(t * 0.5) * 0.05;
      ra.rotation.x = -Math.sin(t * 0.5) * 0.05;
      ll.rotation.x = 0;
      rl.rotation.x = 0;
      group.position.y = Math.sin(t * 0.8) * 0.02;
      group.rotation.y = 0;
      break;
    case 'wave':
      la.rotation.x = 0;
      ra.rotation.x = -Math.PI + Math.sin(t * 3) * 0.3;
      ra.rotation.z = 0.2;
      ll.rotation.x = 0;
      rl.rotation.x = 0;
      group.position.y = 0;
      group.rotation.y = 0;
      break;
    case 'dance':
      la.rotation.x = Math.sin(t * 3) * 1.2;
      ra.rotation.x = -Math.sin(t * 3) * 1.2;
      ll.rotation.x = Math.sin(t * 3) * 0.4;
      rl.rotation.x = -Math.sin(t * 3) * 0.4;
      group.position.y = Math.abs(Math.sin(t * 3)) * 0.15;
      group.rotation.y = Math.sin(t * 1.5) * 0.2;
      break;
    case 'walk':
      la.rotation.x = Math.sin(t * 2.5) * 0.8;
      ra.rotation.x = -Math.sin(t * 2.5) * 0.8;
      ll.rotation.x = -Math.sin(t * 2.5) * 0.6;
      rl.rotation.x = Math.sin(t * 2.5) * 0.6;
      group.position.y = Math.abs(Math.sin(t * 2.5)) * 0.05;
      group.rotation.y = 0;
      break;
    case 'jump':
      la.rotation.x = -Math.PI * 0.8 * Math.max(0, Math.sin(t * 2));
      ra.rotation.x = -Math.PI * 0.8 * Math.max(0, Math.sin(t * 2));
      ll.rotation.x = Math.sin(t * 2) * 0.3;
      rl.rotation.x = Math.sin(t * 2) * 0.3;
      group.position.y = Math.max(0, Math.sin(t * 2)) * 0.8;
      group.rotation.y = 0;
      break;
    case 'spin':
      la.rotation.x = -0.5;
      ra.rotation.x = -0.5;
      ll.rotation.x = 0;
      rl.rotation.x = 0;
      group.position.y = 0.1;
      group.rotation.y = t * 2;
      break;
  }
}
