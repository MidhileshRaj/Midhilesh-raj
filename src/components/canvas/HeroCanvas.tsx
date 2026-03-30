"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 100);
    camera.position.z = 4.5;

    const resize = () => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    resize();
    window.addEventListener("resize", resize);

    // --- STAR PARTICLES ---
    const COUNT = 550;
    const positions = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT; i++) {
      positions[i * 3]     = (Math.random() - 0.5) * 15;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 7;
    }
    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const pMat = new THREE.PointsMaterial({
      size: 0.02,
      color: 0xffffff,
      transparent: true,
      opacity: 0.7,
      sizeAttenuation: true,
    });
    const particles = new THREE.Points(pGeo, pMat);
    scene.add(particles);

    // --- YELLOW ACCENT PARTICLES ---
    const ACOUNT = 80;
    const aPositions = new Float32Array(ACOUNT * 3);
    for (let i = 0; i < ACOUNT; i++) {
      aPositions[i * 3]     = (Math.random() - 0.5) * 12;
      aPositions[i * 3 + 1] = (Math.random() - 0.5) * 8;
      aPositions[i * 3 + 2] = (Math.random() - 0.5) * 5;
    }
    const aGeo = new THREE.BufferGeometry();
    aGeo.setAttribute("position", new THREE.BufferAttribute(aPositions, 3));
    const aMat = new THREE.PointsMaterial({
      size: 0.035,
      color: 0xffeb12,
      transparent: true,
      opacity: 0.5,
      sizeAttenuation: true,
    });
    const accentParticles = new THREE.Points(aGeo, aMat);
    scene.add(accentParticles);

    // --- WIREFRAME ICOSAHEDRON ---
    const icoGeo = new THREE.IcosahedronGeometry(1.5, 1);
    const icoMat = new THREE.MeshBasicMaterial({
      color: 0xffeb12,
      wireframe: true,
      transparent: true,
      opacity: 0.14,
    });
    const ico = new THREE.Mesh(icoGeo, icoMat);
    scene.add(ico);

    // --- OUTER TORUS RING ---
    const ringGeo = new THREE.TorusGeometry(2.5, 0.004, 2, 140);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.07,
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 5;
    scene.add(ring);

    // --- MOUSE TRACKING ---
    const mouse = { x: 0, y: 0 };
    let lerpX = 0;
    let lerpY = 0;
    let autoAngleY = 0;

    const onMouseMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMouseMove);

    // --- ANIMATION LOOP ---
    let animId: number;
    const animate = () => {
      animId = requestAnimationFrame(animate);

      // Smooth lerp toward mouse position
      lerpX += (mouse.y * 0.6 - lerpX) * 0.04;
      lerpY += (mouse.x * 0.8 - lerpY) * 0.04;

      // Auto-rotation angle
      autoAngleY += 0.004;

      // Apply to objects
      particles.rotation.x = lerpX * 0.22;
      particles.rotation.y = lerpY * 0.22 + autoAngleY * 0.15;

      accentParticles.rotation.x = lerpX * 0.15;
      accentParticles.rotation.y = lerpY * 0.3 - autoAngleY * 0.1;

      ico.rotation.y = autoAngleY + lerpY * 0.4;
      ico.rotation.x = lerpX * 0.3;

      ring.rotation.z += 0.002;
      ring.rotation.x += 0.0004;
      ring.rotation.y += lerpY * 0.003;

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      renderer.dispose();
      pGeo.dispose();
      pMat.dispose();
      aGeo.dispose();
      aMat.dispose();
      icoGeo.dispose();
      icoMat.dispose();
      ringGeo.dispose();
      ringMat.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 3 }}
    />
  );
}
