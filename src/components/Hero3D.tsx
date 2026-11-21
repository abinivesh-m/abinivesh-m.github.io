import { Canvas, useFrame } from "@react-three/fiber";
import {
  Environment,
  Float,
  MeshDistortMaterial,
  Sphere,
} from "@react-three/drei";
import { useMemo, useRef } from "react";

function Blob() {
  const ref = useRef<any>(null);
  useFrame(({ clock, pointer }) => {
    const m = ref.current;
    if (!m) return;
    m.rotation.x = clock.getElapsedTime() * 0.18 + pointer.y * 0.45;
    m.rotation.y = clock.getElapsedTime() * 0.22 + pointer.x * 0.45;
  });
  return (
    <Float speed={1.6} rotationIntensity={0.35} floatIntensity={0.7}>
      <Sphere ref={ref} args={[1, 64, 64]} scale={1.05}>
        <MeshDistortMaterial
          color="#6E8BFF"
          envMapIntensity={1.1}
          clearcoat={1}
          clearcoatRoughness={0.08}
          metalness={0.15}
          roughness={0.04}
          distort={0.5}
          speed={2.2}
        />
      </Sphere>
    </Float>
  );
}

function Particles() {
  const ref = useRef<any>(null);
  const positions = useMemo(() => {
    const n = 420;
    const arr = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) {
      const r = 1.6 + Math.random() * 0.9;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, []);
  useFrame(({ clock }) => {
    if (ref.current) ref.current.rotation.y = clock.getElapsedTime() * 0.06;
  });
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.016}
        color="#A78BFA"
        transparent
        opacity={0.75}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

export function Hero3D() {
  return (
    <Canvas
      camera={{ position: [0, 0, 3.4], fov: 42 }}
      dpr={[1, 1.6]}
      gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
      style={{ width: "100%", height: "100%" }}
    >
      <ambientLight intensity={0.35} />
      <directionalLight position={[4, 3, 2]} intensity={0.9} />
      <pointLight position={[-3, -2, -1]} intensity={0.5} color="#A78BFA" />
      <Blob />
      <Particles />
      <Environment preset="city" />
    </Canvas>
  );
}
