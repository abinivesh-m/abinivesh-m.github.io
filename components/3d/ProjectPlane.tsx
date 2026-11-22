'use client'

import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { useTexture, Html } from '@react-three/drei'
import * as THREE from 'three'

export default function ProjectPlane({
  position,
  image,
  title,
}: {
  position: [number, number, number]
  image: string
  title: string
}) {
  const texture = useTexture(image)
  const meshRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)

  useFrame((state) => {
    if (!meshRef.current) return
    meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.45 + position[0]) * 0.12
    meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.06

    const scale = hovered ? 1.08 : 1
    meshRef.current.scale.lerp(new THREE.Vector3(scale, scale, scale), 0.12)
  })

  return (
    <mesh
      ref={meshRef}
      position={position}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <planeGeometry args={[3.35, 1.88]} />
      <meshStandardMaterial
        map={texture}
        emissive={hovered ? '#1d4ed8' : '#000000'}
        emissiveIntensity={hovered ? 0.22 : 0}
        roughness={0.3}
        metalness={0.08}
      />
      <Html transform distanceFactor={9} position={[0, -1.18, 0.02]} center>
        <div className="pointer-events-none rounded-xl border border-white/10 bg-slate-950/70 px-4 py-2 text-sm font-semibold text-white backdrop-blur">
          {title}
        </div>
      </Html>
    </mesh>
  )
}