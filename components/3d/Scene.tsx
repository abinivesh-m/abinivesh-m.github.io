'use client'

import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment, ContactShadows } from '@react-three/drei'
import CameraRig from './CameraRig'
import PortraitPlane from './PortraitPlane'
import ProjectPlane from './ProjectPlane'
import Particles from './Particles'
import Floor from './Floor'

export default function Scene() {
  return (
    <div className="fixed inset-0 z-0 bg-navy">
      <Canvas
        camera={{ position: [0, 1.5, 7.5], fov: 58 }}
        shadows
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <color attach="background" args={['#07111f']} />
        <fog attach="fog" args={['#07111f', 8, 28]} />

        <ambientLight intensity={0.42} />
        <directionalLight
          position={[8, 14, 6]}
          intensity={1.25}
          castShadow
          shadow-mapSize={[2048, 2048]}
          shadow-camera-near={0.5}
          shadow-camera-far={50}
        />
        <pointLight position={[-6, 4, -4]} intensity={0.85} color="#3b82f6" />
        <pointLight position={[6, 2, -8]} intensity={0.65} color="#f59e0b" />

        <Environment preset="night" />

        <CameraRig />

        <Suspense fallback={null}>
          <PortraitPlane position={[0, 1.35, 0]} />
          <ProjectPlane position={[-2.45, 0.45, -3.2]} image="/assets/screenshot-nexus.png" title="NexusShield" />
          <ProjectPlane position={[2.45, 0.1, -5.8]} image="/assets/screenshot-skillnexus.png" title="SkillNexus AI" />
          <ProjectPlane position={[-2.0, -0.35, -8.4]} image="/assets/screenshot-trackx.png" title="TrackX" />
          <Particles />
          <Floor />
        </Suspense>

        <ContactShadows opacity={0.42} scale={20} blur={2.6} far={12} position={[0, -1.65, 0]} />
      </Canvas>
    </div>
  )
}