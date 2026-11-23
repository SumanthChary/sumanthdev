import { useEffect, useRef, useState, type ReactNode } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { projects } from "@/data/projects";
import { cn } from "@/lib/utils";

/**
 * Hero 3D moment — the case studies as a deck of cards in real perspective.
 *
 * - three.js is imported dynamically, so it never touches SSR or the first paint
 * - the pointer tilts the deck; hovering a card lifts it and slides the cards in front
 *   of it aside, so even the ones at the back can be reached
 * - click / tap opens the case study; a numbered pager does the same for keyboards
 * - no WebGL, or prefers-reduced-motion: a static CSS stack of the same cards is shown
 * - the render loop sleeps when the stage is off-screen or the tab is hidden
 */

const cards = projects.map((p) => ({
  slug: p.slug,
  index: p.index,
  title: p.title,
  status: p.status,
  src: (p.hero ?? p.concept?.src) as string,
  concept: !p.hero && !!p.concept,
}));

const CARD_W = 3.2;
const CARD_H = 1.85;
const STEP = { x: 0.32, y: 0.38, z: 0.72 };

const VERT = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const SDF = /* glsl */ `
  float sdRound(vec2 p, vec2 b, float r) {
    vec2 q = abs(p) - b + r;
    return length(max(q, 0.0)) + min(max(q.x, q.y), 0.0) - r;
  }
`;

const CARD_FRAG = /* glsl */ `
  uniform sampler2D map;
  uniform vec2 uSize;
  uniform float uTexAspect, uRadius, uHover, uOpacity, uDim, uSheen;
  varying vec2 vUv;
  ${SDF}
  void main() {
    vec2 p = (vUv - 0.5) * uSize;
    float d = sdRound(p, uSize * 0.5, uRadius);
    float aa = max(fwidth(d), 1e-4);
    float alpha = 1.0 - smoothstep(-aa, aa, d);

    // cover-fit, anchored to the top so page headers stay visible
    float ca = uSize.x / uSize.y;
    vec2 uv = vUv;
    if (uTexAspect > ca) { uv.x = (vUv.x - 0.5) * (ca / uTexAspect) + 0.5; }
    else { uv.y = 1.0 - (1.0 - vUv.y) * (uTexAspect / ca); }
    vec3 col = texture2D(map, uv).rgb;

    // hairline edge in the site's ink colour
    float edge = 1.0 - smoothstep(0.0, 0.014, -d);
    col = mix(col, vec3(0.082, 0.067, 0.051), edge * 0.24);

    // a soft sheen that follows the pointer on the lifted card
    float band = smoothstep(0.38, 0.0, abs(vUv.x + vUv.y * 0.28 - uSheen));
    col += band * 0.1 * uHover;

    // cards that aren't being looked at melt a little into the paper
    col = mix(col, vec3(0.98, 0.972, 0.95), uDim);
    gl_FragColor = vec4(col, alpha * uOpacity);
  }
`;

const SHADOW_FRAG = /* glsl */ `
  uniform vec2 uSize;
  uniform vec2 uBox;
  uniform float uRadius, uOpacity;
  varying vec2 vUv;
  ${SDF}
  void main() {
    vec2 p = (vUv - 0.5) * uSize;
    float d = sdRound(p, uBox * 0.5, uRadius);
    float a = exp(-max(d, 0.0) * 7.5) * 0.4 * uOpacity;
    gl_FragColor = vec4(0.32, 0.2, 0.1, a);
  }
`;

export function HeroStage({ chip }: { chip: ReactNode }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const hoverRef = useRef<number | null>(null);
  const fromCanvas = useRef(false);
  const [hover, setHoverState] = useState<number | null>(null);
  const [ready, setReady] = useState(false);
  const [touch, setTouch] = useState(false);
  const navigate = useNavigate();

  const setHover = (i: number | null) => {
    hoverRef.current = i;
    setHoverState(i);
  };

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    setTouch(window.matchMedia("(hover: none)").matches);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let disposed = false;
    let cleanup = () => {};

    (async () => {
      const THREE = await import("three");
      if (disposed) return;

      let renderer: InstanceType<typeof THREE.WebGLRenderer>;
      try {
        renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
      } catch {
        return; // no WebGL — the CSS stack stays
      }
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setClearColor(0x000000, 0);
      // colours below are authored in sRGB, so skip the linear→sRGB output conversion
      renderer.outputColorSpace = THREE.LinearSRGBColorSpace;

      const loader = new THREE.TextureLoader();
      let textures: InstanceType<typeof THREE.Texture>[];
      try {
        textures = await Promise.all(
          cards.map(
            (c) =>
              new Promise<InstanceType<typeof THREE.Texture>>((res, rej) =>
                loader.load(c.src, res, undefined, rej),
              ),
          ),
        );
      } catch {
        renderer.dispose();
        return;
      }
      if (disposed) {
        textures.forEach((t) => t.dispose());
        renderer.dispose();
        return;
      }
      const aniso = renderer.capabilities.getMaxAnisotropy();
      textures.forEach((t) => {
        t.anisotropy = Math.min(8, aniso);
        t.needsUpdate = true;
      });

      const N = cards.length;
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 80);
      const root = new THREE.Group();
      scene.add(root);

      const cardGeo = new THREE.PlaneGeometry(CARD_W, CARD_H);
      const shadowGeo = new THREE.PlaneGeometry(CARD_W + 1.4, CARD_H + 1.4);
      const holders: InstanceType<typeof THREE.Group>[] = [];
      const meshes: InstanceType<typeof THREE.Mesh>[] = [];
      const cardMats: InstanceType<typeof THREE.ShaderMaterial>[] = [];
      const shadowMats: InstanceType<typeof THREE.ShaderMaterial>[] = [];
      const shadows: InstanceType<typeof THREE.Mesh>[] = [];

      cards.forEach((_, i) => {
        const tex = textures[i]!;
        const img = tex.image as { width: number; height: number };
        const cardMat = new THREE.ShaderMaterial({
          transparent: true,
          depthTest: false,
          depthWrite: false,
          vertexShader: VERT,
          fragmentShader: CARD_FRAG,
          uniforms: {
            map: { value: tex },
            uSize: { value: new THREE.Vector2(CARD_W, CARD_H) },
            uTexAspect: { value: img.width / img.height },
            uRadius: { value: 0.1 },
            uHover: { value: 0 },
            uOpacity: { value: 0 },
            uDim: { value: 0 },
            uSheen: { value: 0.5 },
          },
        });
        const shadowMat = new THREE.ShaderMaterial({
          transparent: true,
          depthTest: false,
          depthWrite: false,
          vertexShader: VERT,
          fragmentShader: SHADOW_FRAG,
          uniforms: {
            uSize: { value: new THREE.Vector2(CARD_W + 1.4, CARD_H + 1.4) },
            uBox: { value: new THREE.Vector2(CARD_W, CARD_H) },
            uRadius: { value: 0.1 },
            uOpacity: { value: 0 },
          },
        });
        const mesh = new THREE.Mesh(cardGeo, cardMat);
        mesh.userData["i"] = i;
        const shadow = new THREE.Mesh(shadowGeo, shadowMat);
        shadow.position.set(0.05, -0.16, -0.02);
        const holder = new THREE.Group();
        holder.add(shadow, mesh);
        root.add(holder);
        holders.push(holder);
        meshes.push(mesh);
        shadows.push(shadow);
        cardMats.push(cardMat);
        shadowMats.push(shadowMat);
      });

      // a little drifting dust for depth
      const dustN = 44;
      const dustPos = new Float32Array(dustN * 3);
      for (let i = 0; i < dustN; i++) {
        dustPos[i * 3] = (Math.random() - 0.5) * 11;
        dustPos[i * 3 + 1] = (Math.random() - 0.5) * 7;
        dustPos[i * 3 + 2] = -7 + Math.random() * 9;
      }
      const dustGeo = new THREE.BufferGeometry();
      dustGeo.setAttribute("position", new THREE.BufferAttribute(dustPos, 3));
      const dustMat = new THREE.PointsMaterial({
        color: 0xe0531f,
        size: 0.05,
        transparent: true,
        opacity: 0.5,
        depthWrite: false,
      });
      const dust = new THREE.Points(dustGeo, dustMat);
      dust.renderOrder = -10;
      scene.add(dust);

      // ---- sizing
      const resize = () => {
        const w = wrap.clientWidth;
        const h = wrap.clientHeight;
        if (!w || !h) return;
        renderer.setSize(w, h, false);
        const aspect = w / h;
        camera.aspect = aspect;
        // keep the whole deck in frame on narrow stages
        const dist = Math.max(9, 9.0 / Math.min(aspect, 1.15));
        camera.position.set(0, 0.1, dist);
        camera.lookAt(0, 0, 0);
        camera.updateProjectionMatrix();
      };
      const ro = new ResizeObserver(resize);
      ro.observe(wrap);
      resize();

      // ---- pointer
      const pointer = { x: 0, y: 0, active: false, moved: false };
      let pointerType = "mouse";
      const ray = new THREE.Raycaster();
      const ndc = new THREE.Vector2();
      const onMove = (e: PointerEvent) => {
        const r = wrap.getBoundingClientRect();
        pointer.x = ((e.clientX - r.left) / r.width) * 2 - 1;
        pointer.y = -(((e.clientY - r.top) / r.height) * 2 - 1);
        pointer.active = true;
        pointer.moved = true;
        pointerType = e.pointerType;
      };
      const onLeave = () => {
        pointer.active = false;
        if (fromCanvas.current) {
          fromCanvas.current = false;
          setHover(null);
        }
      };
      const pick = () => {
        ndc.set(pointer.x, pointer.y);
        ray.setFromCamera(ndc, camera);
        const hit = ray.intersectObjects(meshes, false)[0];
        return hit ? (hit.object.userData["i"] as number) : null;
      };
      const onClick = (e: MouseEvent) => {
        onMove(e as unknown as PointerEvent);
        const i = pick();
        if (i !== null) navigate({ to: "/work/$slug", params: { slug: cards[i]!.slug } });
      };
      wrap.addEventListener("pointermove", onMove);
      wrap.addEventListener("pointerdown", onMove);
      wrap.addEventListener("pointerleave", onLeave);
      wrap.addEventListener("click", onClick);

      // ---- visibility (sleep when off-screen / hidden tab)
      let inView = true;
      const io = new IntersectionObserver(([e]) => {
        inView = !!e?.isIntersecting;
        if (inView) kick();
      });
      io.observe(wrap);
      const onVis = () => {
        if (!document.hidden) kick();
      };
      document.addEventListener("visibilitychange", onVis);

      // ---- animation state
      const hov = new Array<number>(N).fill(0);
      const peel = new Array<number>(N).fill(0);
      let rx = 0.08;
      let ry = -0.3;
      let sheenX = 0.5;
      let last = performance.now();
      const t0 = last;
      let raf = 0;
      let lastCursor = "";
      let shownReady = false;
      const ease = (x: number) => 1 - Math.pow(1 - x, 3);
      const x0 = -((N - 1) * STEP.x) / 2;
      const y0 = -((N - 1) * STEP.y) / 2 - 0.05;

      const frame = (now: number) => {
        raf = 0;
        if (disposed || !inView || document.hidden) return;
        const dt = Math.min(0.05, (now - last) / 1000);
        last = now;
        const t = (now - t0) / 1000;

        // hover from the 3D scene, only while the pointer is over the stage
        if (pointer.active && pointerType !== "touch") {
          const i = pick();
          if (i !== hoverRef.current && (i !== null || fromCanvas.current)) {
            fromCanvas.current = i !== null;
            setHover(i);
          } else if (i !== null) {
            fromCanvas.current = true;
          }
        }
        const target = hoverRef.current;

        // deck tilt: pointer when there is one, a slow sway otherwise
        const wantRy = pointer.active ? -0.3 + pointer.x * 0.2 : -0.3 + Math.sin(t * 0.5) * 0.09;
        const wantRx = pointer.active ? 0.08 - pointer.y * 0.11 : 0.08 + Math.sin(t * 0.37) * 0.025;
        const k = 1 - Math.exp(-dt * 5);
        ry += (wantRy - ry) * k;
        rx += (wantRx - rx) * k;
        root.rotation.set(rx, ry, 0);
        sheenX += ((pointer.active ? 0.5 + pointer.x * 0.4 : 0.5) - sheenX) * k;

        for (let i = 0; i < N; i++) {
          const kh = 1 - Math.exp(-dt * 9);
          const kp = 1 - Math.exp(-dt * 7);
          hov[i]! += ((target === i ? 1 : 0) - hov[i]!) * kh;
          peel[i]! += ((target !== null && i < target ? 1 : 0) - peel[i]!) * kp;

          const intro = ease(Math.min(1, Math.max(0, (t - 0.15 - i * 0.12) / 1.05)));
          const h = hov[i]!;
          const p = peel[i]!;
          const holder = holders[i]!;
          holder.position.set(
            x0 + i * STEP.x - p * 0.38 + h * 0.1,
            y0 +
              i * STEP.y -
              p * 0.8 +
              h * 0.22 -
              (1 - intro) * 1.8 +
              Math.sin(t * 0.9 + i * 1.3) * 0.03,
            -i * STEP.z + h * 1.0,
          );
          holder.rotation.set(0, -ry * 0.55 * h, (i - (N - 1) / 2) * 0.012 * (1 - h));
          holder.scale.setScalar(0.94 + 0.06 * intro + h * 0.03);

          const order = (N - i) * 3 + (h > 0.4 ? 60 : 0);
          shadows[i]!.renderOrder = order;
          meshes[i]!.renderOrder = order + 1;

          const u = cardMats[i]!.uniforms;
          u["uOpacity"]!.value = intro;
          u["uHover"]!.value = h;
          u["uSheen"]!.value = sheenX;
          u["uDim"]!.value = target !== null && target !== i ? 0.1 : 0;
          shadowMats[i]!.uniforms["uOpacity"]!.value = intro * (0.55 + 0.45 * h);
        }

        dust.rotation.y = t * 0.02 + ry * 0.4;
        dust.position.x = pointer.active ? -pointer.x * 0.25 : 0;
        dust.position.y = pointer.active ? -pointer.y * 0.15 : 0;

        const cursor = target !== null && pointer.active ? "pointer" : "";
        if (cursor !== lastCursor) {
          wrap.style.cursor = cursor;
          lastCursor = cursor;
        }

        renderer.render(scene, camera);
        if (!shownReady) {
          shownReady = true;
          setReady(true);
        }
        raf = requestAnimationFrame(frame);
      };
      const kick = () => {
        if (!raf && !disposed) {
          last = performance.now();
          raf = requestAnimationFrame(frame);
        }
      };
      kick();

      cleanup = () => {
        cancelAnimationFrame(raf);
        ro.disconnect();
        io.disconnect();
        document.removeEventListener("visibilitychange", onVis);
        wrap.removeEventListener("pointermove", onMove);
        wrap.removeEventListener("pointerdown", onMove);
        wrap.removeEventListener("pointerleave", onLeave);
        wrap.removeEventListener("click", onClick);
        wrap.style.cursor = "";
        cardGeo.dispose();
        shadowGeo.dispose();
        dustGeo.dispose();
        dustMat.dispose();
        cardMats.forEach((m) => m.dispose());
        shadowMats.forEach((m) => m.dispose());
        textures.forEach((tx) => tx.dispose());
        renderer.dispose();
        renderer.forceContextLoss();
      };
    })();

    return () => {
      disposed = true;
      cleanup();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const active = hover !== null ? cards[hover]! : null;

  return (
    <div
      ref={wrapRef}
      role="group"
      aria-label={`Selected work — ${cards.length} case studies`}
      className="relative h-[390px] w-full select-none sm:h-[520px] lg:h-[600px]"
    >
      {/* static stack: server render, reduced motion, no WebGL — and the first paint before three loads */}
      <div
        aria-hidden="true"
        className={cn(
          "absolute inset-0 grid place-items-center transition-opacity duration-700",
          ready ? "opacity-0" : "opacity-100",
        )}
      >
        <div className="relative aspect-[16/10] w-[74%] max-w-[470px] -translate-y-3">
          {cards
            .slice(0, 3)
            .reverse()
            .map((c, i) => (
              <img
                key={c.slug}
                src={c.src}
                alt=""
                decoding="async"
                className="absolute inset-0 h-full w-full rounded-xl border border-border-strong object-cover object-top shadow-[var(--shadow-float)]"
                style={{ transform: `translate(${(2 - i) * 24}px, ${(i - 2) * 22}px)` }}
              />
            ))}
        </div>
      </div>

      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className={cn(
          "absolute inset-0 h-full w-full transition-opacity duration-700",
          ready ? "opacity-100" : "opacity-0",
        )}
      />

      {/* label — follows whatever card is lifted */}
      <div className="pointer-events-none absolute left-0 top-0 max-w-[80%]">
        <p className="mono-label flex items-center gap-2.5 text-brown-soft before:h-px before:w-3.5 before:bg-primary before:content-['']">
          {active
            ? `${active.index} — ${active.status}${active.concept ? " · concept" : ""}`
            : touch
              ? "Tap a card to open it"
              : "Hover a card · click to open"}
        </p>
        <p
          key={active?.slug ?? "idle"}
          className="animate-fade-rise mt-2 font-serif text-[clamp(1.6rem,3vw,2.3rem)] leading-none text-foreground"
        >
          {active ? active.title : "Selected work"}
        </p>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex flex-wrap items-end justify-between gap-x-4 gap-y-3">
        <div className="pointer-events-auto">{chip}</div>
        <nav aria-label="Case studies" className="pointer-events-auto flex gap-1.5">
          {cards.map((c, i) => (
            <Link
              key={c.slug}
              to="/work/$slug"
              params={{ slug: c.slug }}
              aria-label={`${c.title} case study`}
              onMouseEnter={() => {
                fromCanvas.current = false;
                setHover(i);
              }}
              onMouseLeave={() => setHover(null)}
              onFocus={() => setHover(i)}
              onBlur={() => setHover(null)}
              className={cn(
                "grid size-10 place-items-center rounded-full border sm:size-9 font-mono text-[0.62rem] tracking-[0.04em] transition-all duration-300 ease-[var(--ease-out-soft)]",
                hover === i
                  ? "-translate-y-0.5 border-foreground bg-foreground text-background"
                  : "border-border-strong bg-background/70 text-brown backdrop-blur hover:border-primary hover:text-primary",
              )}
            >
              {c.index}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
