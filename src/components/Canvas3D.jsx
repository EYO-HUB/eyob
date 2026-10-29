import React, { useRef, useMemo, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Sparkles, ContactShadows, Environment, OrbitControls, MeshDistortMaterial, useGLTF, Html, Center } from '@react-three/drei'
import * as THREE from 'three'

// Custom Loaded GLB/GLTF Model Component
function CustomGLTFModel({ url, wireframe }) {
  const { scene } = useGLTF(url)

  scene.traverse((child) => {
    if (child.isMesh && child.material) {
      child.material.wireframe = wireframe
      child.castShadow = true
      child.receiveShadow = true
    }
  })

  return (
    <Center>
      <primitive object={scene.clone(true)} scale={1.5} />
    </Center>
  )
}

// 1. Primary Feature Model: Duo-Tone Kinetic Iris Ring
function DuoToneIrisRing({
  wireframe = false,
  speed = 1.0,
  meshBaseColor = '#f0f4f8',
  accentColor = '#ff4500'
}) {
  const groupRef = useRef()

  const count = 18 // 18 Curved Petal Blades forming the kinetic iris ring

  // Create curved petal blade geometry using extruded shape with smooth bevel
  const bladeGeometry = useMemo(() => {
    const shape = new THREE.Shape()
    shape.moveTo(0, 0)
    shape.bezierCurveTo(0.35, 0.45, 0.45, 1.6, 0, 2.3)
    shape.bezierCurveTo(-0.45, 1.6, -0.35, 0.45, 0, 0)

    const extrudeSettings = {
      steps: 1,
      depth: 0.035,
      bevelEnabled: true,
      bevelThickness: 0.02,
      bevelSize: 0.02,
      bevelSegments: 4
    }
    return new THREE.ExtrudeGeometry(shape, extrudeSettings)
  }, [])

  // Create duo-tone split materials: Base Metal (top-right) & Radiant Accent (bottom-left)
  const bladeMaterials = useMemo(() => {
    const materials = []

    for (let i = 0; i < count; i++) {
      // Half metallic base, half vibrant glowing accent
      const isBaseMetal = (i >= 0 && i < count / 2)

      if (isBaseMetal) {
        // High-shine Polished Metallic Base Blade
        materials.push(
          new THREE.MeshPhysicalMaterial({
            color: new THREE.Color(meshBaseColor),
            metalness: 0.95,
            roughness: 0.08,
            clearcoat: 1.0,
            clearcoatRoughness: 0.05,
            wireframe: wireframe,
            side: THREE.DoubleSide
          })
        )
      } else {
        // Vibrant Glowing Accent Blade
        materials.push(
          new THREE.MeshPhysicalMaterial({
            color: new THREE.Color(accentColor),
            emissive: new THREE.Color(accentColor),
            emissiveIntensity: 1.25,
            metalness: 0.55,
            roughness: 0.18,
            clearcoat: 0.9,
            wireframe: wireframe,
            side: THREE.DoubleSide
          })
        )
      }
    }
    return materials
  }, [count, wireframe, meshBaseColor, accentColor])

  useFrame((state, delta) => {
    if (groupRef.current) {
      // Kinetic slow rotation mimicking the reference animation
      groupRef.current.rotation.z += delta * 0.22 * speed
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.4) * 0.15
      groupRef.current.rotation.x = Math.cos(state.clock.elapsedTime * 0.3) * 0.12
    }
  })

  return (
    <group position={[1.1, -0.1, 0]} rotation={[0.3, -0.15, -0.2]}>
      {/* Concentrated Dynamic Light Glow Source */}
      <pointLight position={[-1.2, 0, 0.5]} color={accentColor} intensity={12} distance={8} decay={1.1} />
      <pointLight position={[1.0, 1.2, 1.0]} color="#ffffff" intensity={4} distance={6} decay={1.4} />

      {/* Kinetic Iris Ring Assembly */}
      <group ref={groupRef}>
        {bladeMaterials.map((mat, i) => {
          const angle = (i / count) * Math.PI * 2
          const radiusOffset = 0.25
          const zOffset = i * 0.006 - 0.05
          const tiltAngle = 0.85 // Toroid Iris tilt angle

          return (
            <mesh
              key={i}
              geometry={bladeGeometry}
              material={mat}
              position={[
                Math.cos(angle) * radiusOffset,
                Math.sin(angle) * radiusOffset,
                zOffset
              ]}
              rotation={[
                tiltAngle,
                0,
                angle + Math.PI / 2
              ]}
              scale={[0.9, 0.9, 0.9]}
              castShadow
              receiveShadow
            />
          )
        })}
      </group>
    </group>
  )
}

// 2. Secondary Model: Dynamic Torus Knot
function EmberTorusKnot({ wireframe, accentColor = '#ff4500' }) {
  const meshRef = useRef()

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.2
      meshRef.current.rotation.y += delta * 0.3
    }
  })

  return (
    <Float speed={2} rotationIntensity={1.2} floatIntensity={1.5}>
      <mesh ref={meshRef} position={[0, 0, 0]} castShadow receiveShadow>
        <torusKnotGeometry args={[1.2, 0.38, 128, 32]} />
        <meshPhysicalMaterial
          color={accentColor}
          emissive={accentColor}
          emissiveIntensity={0.65}
          roughness={0.18}
          metalness={0.8}
          clearcoat={1}
          clearcoatRoughness={0.1}
          wireframe={wireframe}
        />
      </mesh>
    </Float>
  )
}

// 3. Tertiary Model: Crystal
function GoldenCrystal({ wireframe, accentColor = '#ffaa00' }) {
  const meshRef = useRef()

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y -= delta * 0.3
      meshRef.current.rotation.z += delta * 0.2
    }
  })

  return (
    <Float speed={2.5} rotationIntensity={1.8} floatIntensity={2}>
      <mesh ref={meshRef} position={[0, 0, 0]} castShadow receiveShadow>
        <icosahedronGeometry args={[1.3, 0]} />
        <MeshDistortMaterial
          color={accentColor}
          roughness={0.1}
          metalness={0.9}
          distort={0.4}
          speed={2}
          wireframe={wireframe}
        />
      </mesh>
    </Float>
  )
}

// 4. Ambient Background Floating 3D Geometries
function BackgroundFloatingGeometries({ wireframe, accentColor = '#ff4500', meshBaseColor = '#f0f4f8' }) {
  const sphereRef = useRef()
  const octaRef = useRef()
  const torusRef = useRef()

  useFrame((state, delta) => {
    if (sphereRef.current) sphereRef.current.rotation.y += delta * 0.12
    if (octaRef.current) octaRef.current.rotation.x += delta * 0.18
    if (torusRef.current) torusRef.current.rotation.z -= delta * 0.15
  })

  return (
    <group>
      {/* Floating Wireframe Sphere (Top Left Background) */}
      <Float speed={1.8} rotationIntensity={0.8} floatIntensity={1.2}>
        <mesh ref={sphereRef} position={[-3.5, 2.2, -2.5]}>
          <icosahedronGeometry args={[0.95, 1]} />
          <meshStandardMaterial
            color={accentColor}
            metalness={0.9}
            roughness={0.15}
            wireframe={true}
            transparent
            opacity={0.55}
          />
        </mesh>
      </Float>

      {/* Floating Accent Octahedron (Bottom Right Background) */}
      <Float speed={2.2} rotationIntensity={1.2} floatIntensity={1.6}>
        <mesh ref={octaRef} position={[3.6, -2.0, -2.0]}>
          <octahedronGeometry args={[0.85, 0]} />
          <meshPhysicalMaterial
            color={accentColor}
            emissive={accentColor}
            emissiveIntensity={0.7}
            metalness={0.6}
            roughness={0.2}
            wireframe={wireframe}
          />
        </mesh>
      </Float>

      {/* Floating Metallic Torus (Bottom Left Background) */}
      <Float speed={1.5} rotationIntensity={0.6} floatIntensity={1.0}>
        <mesh ref={torusRef} position={[-3.0, -2.2, -3.0]}>
          <torusGeometry args={[0.7, 0.18, 16, 32]} />
          <meshPhysicalMaterial
            color={meshBaseColor}
            metalness={0.95}
            roughness={0.05}
            clearcoat={1.0}
            wireframe={wireframe}
          />
        </mesh>
      </Float>
    </group>
  )
}

// Suspense Fallback Loader
function CanvasLoader() {
  return (
    <Html center>
      <div className="flex flex-col items-center justify-center text-stone-300 gap-2 font-mono text-xs font-semibold">
        <div className="w-6 h-6 border-2 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
        <span>Loading 3D Engine...</span>
      </div>
    </Html>
  )
}

// WebGL Capability Detector
function isWebGLAvailable() {
  try {
    const canvas = document.createElement('canvas')
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    )
  } catch (e) {
    return false
  }
}

// React Error Boundary for WebGL initialization failures
class WebGLErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error) {
    console.warn("WebGL initialization failed. Rendering 2D Fallback Ornament.", error)
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback
    }
    return this.props.children
  }
}

// 2D Creative Background Fallback
function Canvas2DFallback({ accentColor = '#ff4500' }) {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 flex items-center justify-center overflow-hidden">
      {/* Procedural Watercolor SVG Splash Overlay */}
      <svg className="absolute w-full h-full opacity-35" viewBox="0 0 1000 1000" preserveAspectRatio="none">
        <defs>
          <filter id="svgBlur" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="60" />
          </filter>
          <radialGradient id="watercolorGrad1" cx="40%" cy="30%" r="60%">
            <stop offset="0%" stopColor={accentColor} stopOpacity="0.45" />
            <stop offset="100%" stopColor="transparent" stopOpacity="0" />
          </radialGradient>
        </defs>
        <path d="M 150 200 Q 350 100 650 250 T 850 600 T 450 850 T 100 550 Z" fill="url(#watercolorGrad1)" filter="url(#svgBlur)" />
      </svg>
      
      {/* Kinetic 2D Iris Graphic Ornament */}
      <div className="absolute top-1/3 right-[12%] w-64 h-64 border border-white/20 rounded-full flex items-center justify-center animate-spin-slow opacity-80">
        <div className="w-48 h-48 border border-dashed border-white/30 rounded-full flex items-center justify-center">
          <div className="w-32 h-32 rounded-full backdrop-blur-sm border border-white/40 flex items-center justify-center" style={{ backgroundColor: `${accentColor}25` }}>
            <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-white">
              3D OPTIMIZED
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Canvas3D({
  wireframe = false,
  activeModel = 'fan',
  customModelUrl = null,
  meshBaseColor = '#f0f4f8',
  accentColor = '#ff4500'
}) {
  const hasWebGL = useMemo(() => isWebGLAvailable(), [])

  if (!hasWebGL) {
    return <Canvas2DFallback accentColor={accentColor} />
  }

  return (
    <div className="fixed top-0 left-0 w-full h-screen z-0 pointer-events-none">
      <WebGLErrorBoundary fallback={<Canvas2DFallback accentColor={accentColor} />}>
        <Canvas
          camera={{ position: [0, 0, 6.2], fov: 48 }}
          gl={{ antialias: true, alpha: true }}
          onCreated={({ gl }) => {
            gl.setClearColor(0x000000, 0)
          }}
        >
          {/* Dynamic Ambient & Directional Lighting */}
          <ambientLight intensity={1.1} color="#ffffff" />
          <directionalLight position={[10, 15, 8]} intensity={2.4} color={accentColor} castShadow />
          <pointLight position={[-10, -10, -5]} color={accentColor} intensity={3.0} />
          <pointLight position={[10, -5, 5]} color={meshBaseColor} intensity={2.0} />

          <Suspense fallback={<CanvasLoader />}>
            <BackgroundFloatingGeometries
              wireframe={wireframe}
              accentColor={accentColor}
              meshBaseColor={meshBaseColor}
            />
            {customModelUrl ? (
              <CustomGLTFModel url={customModelUrl} wireframe={wireframe} />
            ) : (
              <>
                {activeModel === 'fan' && (
                  <DuoToneIrisRing
                    wireframe={wireframe}
                    meshBaseColor={meshBaseColor}
                    accentColor={accentColor}
                  />
                )}
                {activeModel === 'knot' && (
                  <EmberTorusKnot
                    wireframe={wireframe}
                    accentColor={accentColor}
                    meshBaseColor={meshBaseColor}
                  />
                )}
                {activeModel === 'crystal' && (
                  <GoldenCrystal
                    wireframe={wireframe}
                    accentColor={accentColor}
                  />
                )}
              </>
            )}
          </Suspense>

          {/* Dynamic Ambient Sparkles matching accentColor */}
          <Sparkles count={120} scale={12} size={3.2} speed={0.5} opacity={0.75} color={accentColor} />
          <Sparkles count={70} scale={8} size={4.5} speed={0.3} opacity={0.5} color={accentColor} />

          {/* Subtle Ground Contact Shadow */}
          <ContactShadows position={[0, -2.6, 0]} opacity={0.7} scale={12} blur={2.8} far={5} color="#000000" />

          {/* Smooth Interactive Orbit Controls */}
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            rotateSpeed={0.4}
            maxPolarAngle={Math.PI / 1.8}
            minPolarAngle={Math.PI / 2.5}
          />
        </Canvas>
      </WebGLErrorBoundary>
    </div>
  )
}
