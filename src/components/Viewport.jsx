import { useEffect, useRef, useCallback } from 'react';
import * as THREE from 'three';
import { createBlockyCharacter } from '../lib/createCharacter';
import { buildEnvironment } from '../lib/scenes';
import { animateCharacter } from '../lib/animations';
import { SCENES } from '../lib/constants';

const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();
const groundPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
const intersectPoint = new THREE.Vector3();

export default function Viewport({ characters, sceneIdx, cameraAngle, cameraHeight, zoom, canvasRef, onCharacterMove }) {
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const animFrameRef = useRef(null);
  const charactersRef = useRef([]);
  const clockRef = useRef(new THREE.Clock());
  const dragRef = useRef(null); // { charIndex, offsetX, offsetZ }

  const currentScene = SCENES[sceneIdx];

  const rebuildScene = useCallback(() => {
    const scene = sceneRef.current;
    if (!scene) return;

    while (scene.children.length > 0) scene.remove(scene.children[0]);

    buildEnvironment(scene, currentScene);

    charactersRef.current = [];
    characters.forEach((charData) => {
      const charGroup = createBlockyCharacter(charData);
      scene.add(charGroup);
      charactersRef.current.push(charGroup);
    });
  }, [characters, currentScene]);

  // Convert pointer event to normalized device coords
  const getPointerNDC = useCallback((e) => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    const rect = canvas.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    pointer.x = ((clientX - rect.left) / rect.width) * 2 - 1;
    pointer.y = -((clientY - rect.top) / rect.height) * 2 + 1;
    return pointer;
  }, [canvasRef]);

  // Find which character group a mesh belongs to
  const findCharacterIndex = useCallback((object) => {
    let current = object;
    while (current) {
      const idx = charactersRef.current.indexOf(current);
      if (idx !== -1) return idx;
      current = current.parent;
    }
    return -1;
  }, []);

  // Get ground-plane intersection for current pointer
  const getGroundPoint = useCallback((ndc) => {
    const camera = cameraRef.current;
    if (!camera || !ndc) return null;
    raycaster.setFromCamera(ndc, camera);
    if (raycaster.ray.intersectPlane(groundPlane, intersectPoint)) {
      return { x: intersectPoint.x, z: intersectPoint.z };
    }
    return null;
  }, []);

  // Pointer handlers
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const onPointerDown = (e) => {
      const ndc = getPointerNDC(e);
      if (!ndc) return;
      const camera = cameraRef.current;
      const scene = sceneRef.current;
      if (!camera || !scene) return;

      raycaster.setFromCamera(ndc, camera);
      const allMeshes = [];
      charactersRef.current.forEach((group) => {
        group.traverse((child) => {
          if (child.isMesh) allMeshes.push(child);
        });
      });

      const hits = raycaster.intersectObjects(allMeshes, false);
      if (hits.length > 0) {
        const charIdx = findCharacterIndex(hits[0].object);
        if (charIdx !== -1) {
          const ground = getGroundPoint(ndc);
          if (ground) {
            const group = charactersRef.current[charIdx];
            dragRef.current = {
              charIndex: charIdx,
              offsetX: group.position.x - ground.x,
              offsetZ: group.position.z - ground.z,
            };
            canvas.style.cursor = 'grabbing';
            // Prevent page scroll while dragging on touch
            e.preventDefault();
          }
        }
      }
    };

    const onPointerMove = (e) => {
      if (!dragRef.current) return;
      e.preventDefault();
      const ndc = getPointerNDC(e);
      const ground = getGroundPoint(ndc);
      if (!ground) return;

      const { charIndex, offsetX, offsetZ } = dragRef.current;
      const group = charactersRef.current[charIndex];
      if (!group) return;

      // Clamp to scene bounds
      const newX = Math.max(-8, Math.min(8, ground.x + offsetX));
      const newZ = Math.max(-8, Math.min(8, ground.z + offsetZ));
      group.position.x = newX;
      group.position.z = newZ;
    };

    const onPointerUp = () => {
      if (dragRef.current) {
        const { charIndex } = dragRef.current;
        const group = charactersRef.current[charIndex];
        if (group && onCharacterMove) {
          onCharacterMove(charIndex, group.position.x, group.position.z);
        }
        canvas.style.cursor = '';
        dragRef.current = null;
      }
    };

    // Mouse events
    canvas.addEventListener('pointerdown', onPointerDown);
    canvas.addEventListener('pointermove', onPointerMove);
    canvas.addEventListener('pointerup', onPointerUp);
    canvas.addEventListener('pointerleave', onPointerUp);
    // Touch events (for mobile — prevent scroll while dragging)
    canvas.addEventListener('touchstart', onPointerDown, { passive: false });
    canvas.addEventListener('touchmove', onPointerMove, { passive: false });
    canvas.addEventListener('touchend', onPointerUp);

    return () => {
      canvas.removeEventListener('pointerdown', onPointerDown);
      canvas.removeEventListener('pointermove', onPointerMove);
      canvas.removeEventListener('pointerup', onPointerUp);
      canvas.removeEventListener('pointerleave', onPointerUp);
      canvas.removeEventListener('touchstart', onPointerDown);
      canvas.removeEventListener('touchmove', onPointerMove);
      canvas.removeEventListener('touchend', onPointerUp);
    };
  }, [canvasRef, getPointerNDC, findCharacterIndex, getGroundPoint, onCharacterMove]);

  // Initialize Three.js once
  useEffect(() => {
    if (!canvasRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, 16 / 9, 0.1, 100);
    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, antialias: true, preserveDrawingBuffer: true });
    // Use pixelRatio 1 so canvas buffer matches display size — required for captureStream recording
    renderer.setPixelRatio(1);
    renderer.setSize(640, 360);
    renderer.shadowMap.enabled = true;

    sceneRef.current = scene;
    cameraRef.current = camera;
    rendererRef.current = renderer;

    const animate = () => {
      animFrameRef.current = requestAnimationFrame(animate);
      const time = clockRef.current.getElapsedTime();
      charactersRef.current.forEach((group) => animateCharacter(group, time));
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      renderer.dispose();
    };
  }, [canvasRef]);

  // Rebuild scene when characters or scene changes
  useEffect(() => {
    rebuildScene();
  }, [rebuildScene]);

  // Update camera position
  useEffect(() => {
    if (!cameraRef.current) return;
    const camX = Math.sin(cameraAngle) * zoom;
    const camZ = Math.cos(cameraAngle) * zoom;
    cameraRef.current.position.set(camX, cameraHeight, camZ);
    cameraRef.current.lookAt(0, 1.2, 0);
  }, [cameraAngle, cameraHeight, zoom]);

  return null;
}
