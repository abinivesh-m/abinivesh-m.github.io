'use client'

import * as THREE from 'three'

export default function Floor() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.65, 0]} receiveShadow>
      <planeGeometry args={[40, 40]} />
      <meshStandardMaterial color="#020617" roughness={0.95} metalness={0.05} />
    </mesh>
  )
}