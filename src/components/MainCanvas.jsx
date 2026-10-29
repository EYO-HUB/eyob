import React from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment, ContactShadows } from '@react-three/drei'
import { SpatialCore } from './Interactive3DCore'

export default function MainCanvas({ materialStyle, wireframe, speed, environmentPreset }) {
  return (
    <div className="canvas-container">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.7} />
        <directionalLight position={[10, 15, 8]} intensity={1.5} castShadow />
        <pointLight position={[-10, -10, -5]} color="#a855f7" intensity={2} />
        <pointLight position={[10, -5, 5]} color="#06b6d4" intensity={1.5} />

        <SpatialCore
          materialStyle={materialStyle}
          wireframe={wireframe}
          speed={speed}
        />

        <ContactShadows
          position={[0, -2.5, 0]}
          opacity={0.6}
          scale={12}
          blur={2.5}
          far={5}
        />

        <Environment preset={environmentPreset || 'city'} />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          rotateSpeed={0.5}
          maxPolarAngle={Math.PI / 1.8}
          minPolarAngle={Math.PI / 2.5}
        />
      </Canvas>
    </div>
  )
}
