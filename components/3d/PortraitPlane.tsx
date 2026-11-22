'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useTexture } from '@react-three/drei'
import * as THREE from 'three'

export default function PortraitPlane({ position }: { position: [number, number, number] }) {
  const texture = useTexture('/assets/portrait.png')
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (!meshRef.current) return
    meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.35) * 0.08
    meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.7) * 0.06
  })

  return (
    <mesh ref={meshRef} position={position}>
      <planeGeometry args={[2.45, 3.68]} />
      <meshStandardMaterial map={texture} roughness={0.35} metalness={0.05} transparent />
    </mesh>
  )
}