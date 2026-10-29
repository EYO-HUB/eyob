import React, { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Float, MeshWobbleMaterial, MeshDistortMaterial, ContactShadows, Environment, Text } from '@react-three/drei'
import * as THREE from 'three'

function FloatingKnot({ wireframe, color }) {
  const meshRef = useRef()

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.4
      meshRef.current.rotation.y += delta * 0.5
    }
  })

  return (
    <Float speed={2.5} rotationIntensity={1.2} floatIntensity={1.5}>
      <mesh ref={meshRef} position={[-1.8, 0.2, 0]} castShadow receiveShadow>
        <torusKnotGeometry args={[0.9, 0.3, 128, 32]} />
        <MeshDistortMaterial
          color={color || "#6366f1"}
          wireframe={wireframe}
          distort={0.3}
          speed={2}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>
    </Float>
  )
}

function FloatingIcosahedron({ wireframe }) {
  const meshRef = useRef()

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x -= delta * 0.3
      meshRef.current.rotation.z += delta * 0.3
    }
  })

  return (
    <Float speed={2} rotationIntensity={2} floatIntensity={1.2}>
      <mesh ref={meshRef} position={[1.8, 0.5, -0.5]} castShadow receiveShadow>
        <icosahedronGeometry args={[1.1, 0]} />
        <MeshWobbleMaterial
          color="#06b6d4"
          wireframe={wireframe}
          factor={0.4}
          speed={1.5}
          roughness={0.1}
          metalness={0.9}
        />
      </mesh>
    </Float>
  )
}

function CentralGlassSphere({ wireframe }) {
  const meshRef = useRef()

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.2
    }
  })

  return (
    <Float speed={1.5} floatIntensity={0.8}>
      <mesh ref={meshRef} position={[0, -0.2, 0]} castShadow receiveShadow>
        <sphereGeometry args={[1.2, 64, 64]} />
        <meshPhysicalMaterial
          color="#ec4899"
          roughness={0.1}
          metalness={0.1}
          transmission={0.9}
          ior={1.5}
          thickness={1.2}
          wireframe={wireframe}
        />
      </mesh>
    </Float>
  )
}

export default function Procedural3DScene() {
  const [wireframe, setWireframe] = useState(false)
  const [preset, setPreset] = useState('city')
  const [autoRotate, setAutoRotate] = useState(true)

  return (
    <div className="canvas-wrapper">
      <div className="canvas-controls-overlay glass-panel">
        <div className="control-group">
          <span className="control-title">Display Options</span>
          <div className="btn-group">
            <button
              className={`btn-chip ${wireframe ? 'active' : ''}`}
              onClick={() => setWireframe(!wireframe)}
            >
              Wireframe
            </button>
            <button
              className={`btn-chip ${autoRotate ? 'active' : ''}`}
              onClick={() => setAutoRotate(!autoRotate)}
            >
              Auto Rotate
            </button>
          </div>
        </div>

        <div className="control-group">
          <span className="control-title">Lighting Environment</span>
          <div className="btn-group">
            {['city', 'sunset', 'studio', 'night'].map((env) => (
              <button
                key={env}
                className={`btn-chip ${preset === env ? 'active' : ''}`}
                onClick={() => setPreset(env)}
              >
                {env.charAt(0).toUpperCase() + env.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      <Canvas shadows camera={{ position: [0, 1.5, 5.5], fov: 50 }}>
        <ambientLight intensity={0.6} />
        <directionalLight
          position={[10, 10, 5]}
          intensity={1.5}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#06b6d4" />

        <CentralGlassSphere wireframe={wireframe} />
        <FloatingKnot wireframe={wireframe} />
        <FloatingIcosahedron wireframe={wireframe} />

        <ContactShadows
          position={[0, -2, 0]}
          opacity={0.6}
          scale={10}
          blur={2.5}
          far={4}
        />

        <Environment preset={preset} />

        <OrbitControls
          enablePan={true}
          enableZoom={true}
          autoRotate={autoRotate}
          autoRotateSpeed={1.2}
          minDistance={2}
          maxDistance={12}
        />
      </Canvas>
    </div>
  )
}
