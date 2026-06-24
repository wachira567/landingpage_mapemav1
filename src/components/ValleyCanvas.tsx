import { useRef, useEffect } from 'react';
import * as THREE from 'three';

const vertexShader = `
out vec2 vUv;
void main() {
  vUv = position.xy * 0.5 + 0.5;
  gl_Position = vec4(position, 1.0);
}
`;

const fragmentShader = `
precision highp float;
in vec2 vUv;
uniform float uTime;
uniform vec2 uResolution;
uniform vec3 uCameraPos;
uniform vec3 uCameraLookAt;

layout(location = 0) out vec4 fragColor;

#define PI 3.14159265359
#define MAX_STEPS 96
#define MAX_DIST 80.0
#define SURF_DIST 0.005
#define TERRAIN_AMP 3.5
#define WATER_LEVEL -0.5

float hash(float n) { return fract(sin(n) * 43758.5453); }
float hash2(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec2 hash2d(vec2 p) {
  return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}

float noise(float x) {
  float i = floor(x);
  float f = fract(x);
  f = f * f * (3.0 - 2.0 * f);
  return mix(hash(i), hash(i + 1.0), f);
}

float noise2d(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  float a = hash2(i);
  float b = hash2(i + vec2(1.0, 0.0));
  float c = hash2(i + vec2(0.0, 1.0));
  float d = hash2(i + vec2(1.0, 1.0));
  return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}

vec3 getCameraRay(vec2 uv, vec3 ro, vec3 lookAt) {
  vec3 f = normalize(lookAt - ro);
  vec3 r = normalize(cross(vec3(0.0, 1.0, 0.0), f));
  vec3 u = cross(f, r);
  float fov = 1.0;
  return normalize(uv.x * r + uv.y * u + fov * f);
}

mat2 rot2(float a) {
  float c = cos(a), s = sin(a);
  return mat2(c, -s, s, c);
}

float getTreeHeight(vec2 p) {
  float n = noise2d(p * 0.15);
  if (n < 0.45) return 0.0;
  float h = (n - 0.45) / 0.55;
  return pow(h, 1.5) * 12.0;
}

float treeSDF(vec3 p, vec3 base, float height, float width) {
  vec3 q = p - base;
  float slant = sin(base.x * 3.0 + base.z * 2.0) * 0.3;
  float taper = 1.0 - (q.y / height) * 0.5;
  vec2 trunkDim = max(abs(vec2(q.x + slant * q.y, q.z)) - vec2(width * taper * 0.3), 0.0);
  float trunk = length(trunkDim);
  float cone = length(vec2(q.x + slant * q.y, q.z)) - width * taper;
  return max(q.y - height, min(trunk, cone));
}

float treeCluster(vec3 p) {
  float cluster = MAX_DIST;
  float cellSize = 2.0;
  vec2 cell = floor(p.xz / cellSize);
  vec2 rnd = hash2d(cell);
  if (rnd.x > 0.4) return MAX_DIST;
  vec2 base = cell * cellSize + vec2(0.5) * cellSize;
  float h = getTreeHeight(base);
  if (h < 1.0) return MAX_DIST;
  float tree = treeSDF(p, vec3(base.x, -1.0, base.y), h, 0.3 + rnd.y * 0.15);
  cluster = min(cluster, tree);
  for (int nx = -1; nx <= 1; nx++) {
    for (int nz = -1; nz <= 1; nz++) {
      if (nx == 0 && nz == 0) continue;
      vec2 nc = cell + vec2(float(nx), float(nz));
      vec2 nrnd = hash2d(nc);
      if (nrnd.x > 0.4) continue;
      vec2 nbase = nc * cellSize + vec2(0.5) * cellSize;
      float nh = getTreeHeight(nbase);
      if (nh < 1.0) continue;
      float nTree = treeSDF(p, vec3(nbase.x, -1.0, nbase.y), nh, 0.3 + nrnd.y * 0.15);
      cluster = min(cluster, nTree);
    }
  }
  return cluster;
}

float valleyTerrain(vec3 p) {
  float d = abs(p.z) * 0.3;
  float valleyShape = -exp(-d * d * 0.08) * 8.0;
  float ridges = sin(p.x * 0.5) * cos(p.z * 0.3) * 0.8 + sin(p.x * 0.2 + p.z * 0.4) * 1.5;
  float detail = noise2d(p.xz * 0.5) * 0.5 + noise2d(p.xz * 1.5) * 0.2;
  return p.y - (valleyShape + ridges + detail) * 0.5 - 2.0;
}

float valleyTerrainLite(vec3 p) {
  float d = abs(p.z) * 0.3;
  float valleyShape = -exp(-d * d * 0.08) * 8.0;
  return p.y - valleyShape * 0.5 - 2.0;
}

float smoothMin(float a, float b, float k) {
  float h = clamp(0.5 + 0.5 * (b - a) / k, 0.0, 1.0);
  return mix(b, a, h) - k * h * (1.0 - h);
}

float sceneSDF(vec3 p) {
  float terrain = valleyTerrain(p);
  float shore = smoothMin(terrain, length(p.y - 0.5) - 0.1, 0.5);
  float ground = smoothMin(shore, p.y + 2.0, 1.0);
  return min(ground, treeCluster(p));
}

float sceneSDFLite(vec3 p) {
  return min(valleyTerrainLite(p), p.y + 2.0);
}

vec3 getNormal(vec3 p) {
  vec2 e = vec2(SURF_DIST, 0.0);
  return normalize(vec3(
    sceneSDF(p) - vec3(sceneSDF(p - e.xyy), sceneSDF(p - e.yxy), sceneSDF(p - e.yyx))
  ));
}

vec2 raymarch(vec3 ro, vec3 rd) {
  float dO = 0.0;
  float dS = 0.0;
  // Coarse pass
  for (int i = 0; i < 32; i++) {
    vec3 p = ro + rd * dO;
    dS = sceneSDFLite(p) * 0.8;
    if (dS < SURF_DIST || dO > MAX_DIST) break;
    dO += dS;
  }
  // Fine pass
  if (dS >= SURF_DIST) {
    dO = max(dO - 0.5, 0.0);
    for (int i = 32; i < MAX_STEPS; i++) {
      vec3 p = ro + rd * dO;
      dS = sceneSDF(p);
      if (dS < SURF_DIST || dO > MAX_DIST) break;
      dO += dS;
    }
  }
  return vec2(dO, dS);
}

float getWaterHeight(vec2 p) {
  float t = uTime * 0.3;
  return sin(p.x * 2.0 + t) * 0.1 + cos(p.y * 3.0 + t * 0.8) * 0.08 + sin((p.x + p.y) * 1.5 + t * 1.2) * 0.05;
}

float waterSDF(vec3 p) {
  return p.y - (WATER_LEVEL + getWaterHeight(p.xz));
}

vec3 waterNormal(vec3 p) {
  float eps = 0.1;
  float h = getWaterHeight(p.xz);
  float hx = getWaterHeight(p.xz + vec2(eps, 0.0));
  float hy = getWaterHeight(p.xz + vec2(0.0, eps));
  return normalize(vec3(h - hx, eps * 0.5, h - hy));
}

vec3 getTerrainColor(vec3 p, vec3 n) {
  float slope = 1.0 - n.y;
  float d = abs(p.z);
  float shoreFactor = smoothstep(0.0, 2.0, d);
  vec3 grassColor = mix(vec3(0.02, 0.06, 0.02), vec3(0.03, 0.05, 0.02), noise2d(p.xz * 0.8));
  vec3 rockColor = mix(vec3(0.04, 0.03, 0.02), vec3(0.06, 0.05, 0.03), noise2d(p.xz * 2.0));
  vec3 dirtColor = mix(vec3(0.03, 0.025, 0.015), vec3(0.05, 0.04, 0.025), noise2d(p.xz * 1.5));
  vec3 mossColor = mix(vec3(0.02, 0.04, 0.02), vec3(0.025, 0.05, 0.02), noise2d(p.xz * 3.0));
  vec3 color = mix(grassColor, mossColor, smoothstep(0.3, 0.7, slope));
  color = mix(dirtColor, color, shoreFactor);
  color = mix(color, rockColor, smoothstep(0.5, 0.9, slope));
  return mix(color, vec3(0.06, 0.05, 0.03), smoothstep(0.0, 8.0, p.y) * 0.5);
}

vec3 getWaterColor(vec3 p, vec3 n, vec3 rd) {
  float fresnel = pow(1.0 - max(dot(n, -rd), 0.0), 5.0);
  vec3 deepColor = vec3(0.04, 0.08, 0.07);
  vec3 shallowColor = vec3(0.06, 0.12, 0.10);
  vec3 waterColor = mix(shallowColor, deepColor, smoothstep(-0.5, -2.0, p.y));
  vec3 reflectDir = reflect(rd, n);
  vec3 reflectionColor = getTerrainColor(p + reflectDir * 0.1, reflectDir) * 0.6;
  return mix(waterColor, reflectionColor, fresnel * 0.8);
}

vec3 getTreeColor(vec3 p) {
  float rnd = noise2d(floor(p.xz * 0.5));
  vec3 baseColor = mix(vec3(0.01, 0.03, 0.015), vec3(0.015, 0.04, 0.02), noise2d(p.xz * 4.0));
  vec3 barkColor = mix(vec3(0.04, 0.025, 0.015), vec3(0.06, 0.04, 0.025), noise2d(p.xz * 6.0));
  float height = p.y + 1.0;
  return mix(barkColor, baseColor, smoothstep(1.5, 4.0, height));
}

vec3 getFogColor(vec3 rd) {
  vec3 sunDir = normalize(vec3(0.2, 0.15, 1.0));
  float sunDot = max(dot(rd, sunDir), 0.0);
  vec3 skyColor = mix(vec3(0.05, 0.04, 0.03), vec3(0.08, 0.06, 0.04), rd.y);
  return mix(skyColor, vec3(0.15, 0.10, 0.05), pow(sunDot, 20.0));
}

float getFogDensity(vec3 p) {
  float d = abs(p.z) * 0.3;
  return exp(-d * d * 0.02) * 0.3 + 0.05;
}

vec3 volumetricFog(vec3 ro, vec3 rd, float dist) {
  vec3 sunDir = normalize(vec3(0.2, 0.15, 1.0));
  float transmittance = 1.0;
  vec3 scatteredLight = vec3(0.0);
  float stepSize = min(dist, MAX_DIST) / 32.0;
  for (int i = 0; i < 32; i++) {
    float t = stepSize * (float(i) + 0.5);
    vec3 p = ro + rd * t;
    float density = getFogDensity(p);
    float extinction = density * 0.1;
    transmittance *= max(1.0 - extinction, 0.0);
    float phase = 0.25 / PI;
    scatteredLight += vec3(0.25, 0.20, 0.12) * density * phase * transmittance * stepSize;
  }
  return scatteredLight;
}

float godRays(vec3 ro, vec3 rd) {
  vec3 sunDir = normalize(vec3(0.2, 0.15, 1.0));
  float light = 0.0;
  for (int i = 0; i < 16; i++) {
    float t = 1.0 + float(i) * 1.5;
    vec3 p = ro + sunDir * t;
    float d = abs(p.z) * 0.3;
    float valley = -exp(-d * d * 0.08) * 8.0;
    float density = exp(-(p.y - valley) * (p.y - valley) * 0.1);
    float angle = max(dot(rd, sunDir), 0.0);
    light += density * angle * angle;
  }
  return light * 0.03;
}

void main() {
  vec2 uv = (vUv - 0.5) * vec2(uResolution.x / uResolution.y, 1.0);
  vec3 ro = uCameraPos;
  vec3 rd = getCameraRay(uv, ro, uCameraLookAt);
  vec3 col = vec3(0.0);
  vec2 rayResult = raymarch(ro, rd);
  float d = rayResult.x;

  if (d < MAX_DIST) {
    vec3 p = ro + rd * d;
    vec3 n = getNormal(p);

    if (waterSDF(p) < 0.1) {
      vec3 waterN = waterNormal(p);
      col = getWaterColor(p, waterN, rd);
    } else if (treeCluster(p) < 0.5 && p.y > -0.5) {
      col = getTreeColor(p);
    } else {
      col = getTerrainColor(p, n);
    }

    vec3 lightDir = normalize(vec3(0.3, 0.5, 0.8));
    float diff = max(dot(n, lightDir), 0.0);
    float ambient = 0.3;
    float lighting = ambient + diff * 0.7;
    float fogAmount = 1.0 - exp(-d * 0.02);
    vec3 fogCol = getFogColor(rd);
    col = mix(col * lighting, fogCol, fogAmount);
  } else {
    float waterPlane = (WATER_LEVEL - ro.y) / rd.y;
    if (waterPlane > 0.0) {
      vec3 wp = ro + rd * waterPlane;
      vec3 waterN = waterNormal(wp);
      float fresnel = pow(1.0 - max(dot(waterN, -rd), 0.0), 5.0);
      vec3 deepColor = vec3(0.04, 0.08, 0.07);
      vec3 shallowColor = vec3(0.06, 0.12, 0.10);
      col = mix(shallowColor, deepColor, smoothstep(-0.5, -2.0, wp.y));
      col = mix(col, vec3(0.08, 0.06, 0.04), fresnel * 0.3);
    }
    float fogDist = MAX_DIST;
    vec3 fogCol = getFogColor(rd);
    vec3 fog = volumetricFog(ro, rd, fogDist);
    float rays = godRays(ro, rd);
    col = mix(col, fogCol, 1.0 - exp(-fogDist * 0.02));
    col += fog + rays * vec3(0.4, 0.3, 0.15);
  }

  // Film grain
  float grain = (fract(sin(dot(vUv * uTime, vec2(12.9898, 78.233))) * 43758.5453) - 0.5) * 0.03;
  col += grain;

  // Filmic tone mapping
  col = pow(col / (1.0 + col * 0.8), vec3(0.9));

  fragColor = vec4(col, 1.0);
}
`;

export default function ValleyCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stateRef = useRef<{
    renderer: THREE.WebGLRenderer;
    scene: THREE.Scene;
    camera: THREE.OrthographicCamera;
    material: THREE.ShaderMaterial;
    animId: number;
    startTime: number;
    cameraZ: number;
    lookAtY: number;
    isActive: boolean;
  } | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: false });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x050505);

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute([-1, -1, 0, 3, -1, 0, -1, 3, 0], 3));

    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const material = new THREE.ShaderMaterial({
      glslVersion: THREE.GLSL3,
      uniforms: {
        uTime: { value: 0 },
        uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
        uCameraPos: { value: new THREE.Vector3(0, 8, -10) },
        uCameraLookAt: { value: new THREE.Vector3(0, 3, 0) },
      },
      vertexShader,
      fragmentShader,
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const startTime = performance.now();
    const state = {
      renderer,
      scene,
      camera,
      material,
      animId: 0,
      startTime,
      cameraZ: -10,
      lookAtY: 3,
      isActive: true,
    };
    stateRef.current = state;

    // Wheel handler for camera navigation
    const handleWheel = (e: WheelEvent) => {
      if (!state.isActive) return;
      e.preventDefault();
      if (e.deltaY < 0) {
        state.cameraZ -= e.deltaY * 0.05;
        if (state.cameraZ < -150) state.cameraZ = -150;
      } else {
        state.cameraZ -= e.deltaY * 0.05;
        if (state.cameraZ > 60) state.cameraZ = 60;
      }
      material.uniforms.uCameraPos.value.z = state.cameraZ;
      material.uniforms.uCameraLookAt.value.y = state.lookAtY;
    };

    canvas.addEventListener('wheel', handleWheel, { passive: false });

    // Resize handler
    const handleResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      material.uniforms.uResolution.value.set(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // Animation loop
    const animate = () => {
      const elapsed = (performance.now() - startTime) / 1000;
      material.uniforms.uTime.value = elapsed;
      renderer.render(scene, camera);
      state.animId = requestAnimationFrame(animate);
    };
    state.animId = requestAnimationFrame(animate);

    // IntersectionObserver to pause when not visible
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          state.isActive = entry.intersectionRatio > 0.1;
        });
      },
      { threshold: [0, 0.1, 0.5, 1] }
    );
    observer.observe(canvas);

    return () => {
      cancelAnimationFrame(state.animId);
      canvas.removeEventListener('wheel', handleWheel);
      window.removeEventListener('resize', handleResize);
      observer.disconnect();
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 1,
      }}
    />
  );
}
