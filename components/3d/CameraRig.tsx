'use client'

import { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

export default function CameraRig() {
  const { camera } = useThree()
  const target = useRef(new THREE.Vector3(0, 1.5, 7.5))

  useFrame(() => {
    const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight)
    const progress = Math.min(1, Math.max(0, window.scrollY / maxScroll))

    target.current.set(
      Math.sin(progress * Math.PI * 2) * 0.45,
      1.45 + Math.sin(progress * Math.PI) * 0.6,
      7.5 - progress * 11.5
    )

    camera.position.lerp(target.current, 0.08)
    camera.lookAt(0, 0.85, -2 + progress * 1.5)
  })

  return null
}