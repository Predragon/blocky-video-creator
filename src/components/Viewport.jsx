import { useEffect, useRef, useCallback } from 'react';
import * as THREE from 'three';
import { createBlockyCharacter } from '../lib/createCharacter';
import { buildEnvironment } from '../lib/scenes';
import { animateCharacter } from '../lib/animations';
import { SCENES } from '../lib/constants';

export default function Viewport({ characters, sceneIdx, cameraAngle, cameraHeight, zoom, canvasRef }) {
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const animFrameRef = useRef(null);
  const charactersRef = useRef([]);
  const clockRef = useRef(new THREE.Clock());

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

  return null; // Canvas is rendered in App.jsx as a ref
}
