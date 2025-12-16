"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

const clamp = (v, min, max) => Math.min(Math.max(v, min), max);

export default function MiniGame({ isEs }) {
  const wrapRef = useRef(null);
  const rafRef = useRef(null);
  const runningRef = useRef(false);
  const keysRef = useRef({
    ArrowLeft: false,
    ArrowRight: false,
    a: false,
    d: false,
  });
  const stateRef = useRef(null);

  const [running, setRunning] = useState(false);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const isFullscreenRef = useRef(false);

  // Captura teclado
  useEffect(() => {
    const handleDown = (e) => {
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      keysRef.current[key] = true;
    };
    const handleUp = (e) => {
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      keysRef.current[key] = false;
    };
    window.addEventListener("keydown", handleDown);
    window.addEventListener("keyup", handleUp);
    return () => {
      window.removeEventListener("keydown", handleDown);
      window.removeEventListener("keyup", handleUp);
    };
  }, []);

  // Monta escena 3D
  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x05030b, 6, 14);

    const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 50);
    camera.position.set(0, 1.4, 6);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.6));
    wrap.appendChild(renderer.domElement);

    const ambient = new THREE.AmbientLight(0xffffff, 0.6);
    const dir = new THREE.DirectionalLight(0x9b5bff, 0.7);
    dir.position.set(2, 3, 2);
    scene.add(ambient, dir);

    const playerGeo = new THREE.BoxGeometry(0.7, 0.7, 0.7);
    const playerMat = new THREE.MeshStandardMaterial({
      color: 0x46efb3,
      roughness: 0.28,
      metalness: 0.45,
      emissive: 0x164d3e,
      emissiveIntensity: 0.8,
    });
    const player = new THREE.Mesh(playerGeo, playerMat);
    player.position.set(0, -1.6, 0);
    scene.add(player);

    const grid = new THREE.GridHelper(12, 24, 0x335577, 0x112233);
    grid.position.y = -2.2;
    scene.add(grid);

    const bgGeo = new THREE.PlaneGeometry(20, 10);
    const bgMat = new THREE.MeshBasicMaterial({
      color: 0x08060f,
      transparent: true,
      opacity: 0.7,
    });
    const bg = new THREE.Mesh(bgGeo, bgMat);
    bg.position.set(0, 0, -6);
    scene.add(bg);

    const clock = new THREE.Clock();
    const obstacles = [];

    stateRef.current = {
      scene,
      camera,
      renderer,
      player,
      obstacles,
      lastSpawn: 0,
      time: 0,
      clock,
    };

    const handleResize = () => {
      const { w, h } = getSize();
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };

    const handleFsChange = () => {
      const fs = document.fullscreenElement === wrap;
      isFullscreenRef.current = fs;
      setIsFullscreen(fs);
      setTimeout(handleResize, 20);
    };

    document.addEventListener("fullscreenchange", handleFsChange);
    handleResize();

    return () => {
      cancelAnimationFrame(rafRef.current);
      document.removeEventListener("fullscreenchange", handleFsChange);
      obstacles.forEach((o) => {
        o.mesh.geometry.dispose();
        o.mesh.material.dispose();
      });
      playerGeo.dispose();
      playerMat.dispose();
      bgGeo.dispose();
      bgMat.dispose();
      grid.geometry?.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getSize = () => {
    const wrap = wrapRef.current;
    if (isFullscreenRef.current) {
      return {
        w: window.innerWidth || 1920,
        h: window.innerHeight || 1080,
      };
    }
    const w = wrap?.clientWidth || 800;
    const h = Math.max(260, Math.min(500, w * 0.62));
    return { w, h };
  };

  const toggleFullscreen = async () => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    if (!document.fullscreenElement) {
      try {
        await wrap.requestFullscreen();
      } catch (e) {
        console.error(e);
      }
    } else {
      await document.exitFullscreen?.();
    }
  };

  const resetObstacles = () => {
    const state = stateRef.current;
    if (!state) return;
    state.obstacles.forEach((o) => {
      state.scene.remove(o.mesh);
      o.mesh.geometry.dispose();
      o.mesh.material.dispose();
    });
    state.obstacles.length = 0;
  };

  const startGame = async (goFullscreen = false) => {
    if (goFullscreen) await toggleFullscreen();
    const state = stateRef.current;
    if (!state) return;
    resetObstacles();
    state.time = 0;
    state.lastSpawn = 0;
    state.clock.elapsedTime = 0;
    state.clock.start();
    state.player.position.set(0, -1.6, 0);
    runningRef.current = true;
    setScore(0);
    setGameOver(false);
    setRunning(true);
    rafRef.current = requestAnimationFrame(tick);
  };

  const spawnObstacle = () => {
    const state = stateRef.current;
    if (!state) return;
    const size = 0.4 + Math.random() * 0.6;
    const x = -2.6 + Math.random() * 5.2;
    const geo = new THREE.BoxGeometry(size, size, size);
    const mat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      metalness: 0.1,
      roughness: 0.45,
      emissive: 0x264466,
      emissiveIntensity: 0.35,
    });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.set(x, 2.6, -0.3 + Math.random() * 0.6);
    state.scene.add(mesh);
    state.obstacles.push({
      mesh,
      speed: 1.2 + Math.random() * 1.6,
      box: new THREE.Box3(),
    });
  };

  const tick = () => {
    const state = stateRef.current;
    if (!state) return;
    const { scene, camera, renderer, player, obstacles, clock } = state;

    const dt = Math.min(clock.getDelta(), 0.08);
    state.time += dt;

    const left = keysRef.current.ArrowLeft || keysRef.current.a;
    const right = keysRef.current.ArrowRight || keysRef.current.d;
    const move = (right ? 1 : 0) - (left ? 1 : 0);
    player.position.x = clamp(player.position.x + move * dt * 4, -2.8, 2.8);
    player.rotation.y = THREE.MathUtils.lerp(player.rotation.y, move * 0.25, 0.12);

    // Spawn
    if (state.time - state.lastSpawn > 0.85) {
      state.lastSpawn = state.time;
      spawnObstacle();
    }

    // Move obstacles
    obstacles.forEach((o) => {
      o.mesh.position.y -= o.speed * dt * 2.2;
      o.mesh.rotation.x += dt * 0.9;
      o.mesh.rotation.y -= dt * 0.6;
    });
    // Clean up off-screen
    for (let i = obstacles.length - 1; i >= 0; i--) {
      if (obstacles[i].mesh.position.y < -3) {
        const obs = obstacles[i];
        state.scene.remove(obs.mesh);
        obs.mesh.geometry.dispose();
        obs.mesh.material.dispose();
        obstacles.splice(i, 1);
      }
    }

    // Collisions
    const playerBox = new THREE.Box3().setFromObject(player);
    let hit = false;
    obstacles.forEach((o) => {
      o.box.setFromObject(o.mesh);
      if (o.box.intersectsBox(playerBox)) hit = true;
    });

    setScore(Math.floor(state.time * 10));

    if (hit) {
      runningRef.current = false;
      setGameOver(true);
      setRunning(false);
      return;
    }

    renderer.render(scene, camera);
    if (runningRef.current) {
      rafRef.current = requestAnimationFrame(tick);
    }
  };

  // Sync running ref
  useEffect(() => {
    runningRef.current = running;
    if (!running) {
      cancelAnimationFrame(rafRef.current);
    }
  }, [running]);

  return (
    <section className="rounded-2xl border border-white/15 bg-white/5 p-4 shadow-[0_12px_40px_rgba(0,0,0,0.45)] backdrop-blur">
      <div className="mb-4 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-[11px] font-mono uppercase tracking-[0.25em] text-white/40">
            {isEs ? "Minijuego 3D" : "3D mini game"}
          </p>
          <h3 className="text-2xl font-semibold text-white">
            {isEs ? "Evita el glitch" : "Dodge the glitch"}
          </h3>
          <p className="text-sm text-white/70">
            {isEs
              ? "Pulsa Play y mueve con ← → o A/D. Fullscreen real para verlo completo."
              : "Hit Play and move with ← → or A/D. True fullscreen for full view."}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => startGame(false)}
            className="rounded-full border border-white bg-white px-4 py-2 text-sm font-semibold text-black shadow-[0_0_18px_rgba(255,255,255,0.25)] transition hover:-translate-y-0.5 hover:shadow-[0_0_28px_rgba(52,211,153,0.45)]"
          >
            {isEs ? "Play" : "Play"}
          </button>
          <button
            type="button"
            onClick={() => startGame(true)}
            className="rounded-full border border-white/20 bg-black/60 px-4 py-2 text-sm font-semibold text-white transition hover:border-white/50 hover:bg-white/10"
          >
            {isEs ? "Play + Fullscreen" : "Play + Fullscreen"}
          </button>
          <div className="flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-3 py-1 text-[11px] font-mono uppercase tracking-[0.25em] text-white/70">
            <span className="h-2 w-2 rounded-full bg-emerald-300" />
            {isEs ? "Puntuación" : "Score"}: {score.toString().padStart(4, "0")}
          </div>
        </div>
      </div>

      <div
        ref={wrapRef}
        className="relative overflow-hidden rounded-xl border border-white/10 bg-black/80"
      >
        {!running && !gameOver && (
          <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center bg-black/55">
            <p className="text-center text-sm text-white/70">
              {isEs ? "Pulsa Play para empezar" : "Press Play to start"}
            </p>
          </div>
        )}
        {gameOver && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/70">
            <div className="rounded-lg border border-white/20 bg-white/10 px-5 py-4 text-center text-white">
              <p className="text-lg font-semibold">
                {isEs ? "Game over" : "Game over"}
              </p>
              <p className="text-sm text-white/70">
                {isEs ? "Vuelve a intentarlo." : "Try again."}
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
