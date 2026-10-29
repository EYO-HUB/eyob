import React, { Suspense, useState, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, useGLTF, Stage, Html, Environment, Center } from '@react-three/drei'
import { Upload, RefreshCw, Box, AlertCircle, FileCode } from 'lucide-react'

// Dynamic Model Loader component using useGLTF
function LoadedModel({ url, scale, wireframe }) {
  const { scene } = useGLTF(url)

  // Traverse materials if wireframe toggle active
  scene.traverse((child) => {
    if (child.isMesh && child.material) {
      child.material.wireframe = wireframe
      child.castShadow = true
      child.receiveShadow = true
    }
  })

  return (
    <Center>
      <primitive object={scene.clone(true)} scale={scale} />
    </Center>
  )
}

// Fallback procedural geometry when no custom file loaded yet
function FallbackBox({ scale, wireframe }) {
  const meshRef = useRef()
  return (
    <Center>
      <mesh ref={meshRef} scale={scale} castShadow receiveShadow>
        <boxGeometry args={[1.5, 1.5, 1.5]} />
        <meshStandardMaterial
          color="#6366f1"
          metalness={0.6}
          roughness={0.2}
          wireframe={wireframe}
        />
      </mesh>
    </Center>
  )
}

// Loading Spinner for R3F Suspense
function Loader() {
  return (
    <Html center>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: '#fff' }}>
        <div className="spinner"></div>
        <p style={{ fontSize: '0.85rem', fontWeight: 500, letterSpacing: '0.03em' }}>
          Loading 3D Model...
        </p>
      </div>
    </Html>
  )
}

export default function ModelViewer() {
  const [modelUrl, setModelUrl] = useState(null)
  const [fileName, setFileName] = useState(null)
  const [scale, setScale] = useState(1)
  const [preset, setPreset] = useState('studio')
  const [wireframe, setWireframe] = useState(false)
  const [autoRotate, setAutoRotate] = useState(false)
  const [errorMsg, setErrorMsg] = useState(null)

  const handleFileUpload = (e) => {
    const file = e.target.files[0]
    if (!file) return

    if (!file.name.endsWith('.glb') && !file.name.endsWith('.gltf')) {
      setErrorMsg('Please upload a valid .glb or .gltf 3D model file.')
      return
    }

    setErrorMsg(null)
    const url = URL.createObjectURL(file)
    setModelUrl(url)
    setFileName(file.name)
  }

  const handleLoadSample = (sampleType) => {
    setErrorMsg(null)
    if (sampleType === 'duck') {
      // Official Khronos Group sample GLTF model URL
      setModelUrl('https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Duck/glTF-Binary/Duck.glb')
      setFileName('Duck.glb (Khronos Sample)')
    } else if (sampleType === 'helmet') {
      setModelUrl('https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/DamagedHelmet/glTF-Binary/DamagedHelmet.glb')
      setFileName('DamagedHelmet.glb (Khronos Sample)')
    }
  }

  const handleReset = () => {
    setModelUrl(null)
    setFileName(null)
    setErrorMsg(null)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Top Bar for File Upload & Controls */}
      <div className="glass-panel" style={{ padding: '1.25rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <label className="btn-chip active" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', padding: '0.6rem 1.1rem', fontSize: '0.875rem' }}>
            <Upload size={16} />
            <span>Upload .glb / .gltf</span>
            <input type="file" accept=".glb,.gltf" onChange={handleFileUpload} style={{ display: 'none' }} />
          </label>

          <span style={{ color: 'var(--text-dim)', fontSize: '0.85rem' }}>or try sample:</span>

          <button className="btn-chip" onClick={() => handleLoadSample('duck')}>
            🦆 Duck.glb
          </button>
          <button className="btn-chip" onClick={() => handleLoadSample('helmet')}>
            🪖 Helmet.glb
          </button>
        </div>

        {fileName && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span className="badge badge-cyan" style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <Box size={14} /> Active Model: {fileName}
            </span>
            <button className="btn-chip" onClick={handleReset} style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <RefreshCw size={14} /> Reset
            </button>
          </div>
        )}
      </div>

      {errorMsg && (
        <div className="glass-panel" style={{ padding: '0.85rem 1.25rem', borderColor: '#ef4444', color: '#fca5a5', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem' }}>
          <AlertCircle size={18} /> {errorMsg}
        </div>
      )}

      {/* 3D Canvas */}
      <div className="canvas-wrapper">
        <div className="canvas-controls-overlay glass-panel">
          <div className="control-group">
            <span className="control-title">Model Controls</span>
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
            <span className="control-title">Lighting Preset</span>
            <div className="btn-group">
              {['studio', 'city', 'sunset', 'night'].map((env) => (
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

          <div className="control-group">
            <span className="control-title">Scale: {scale.toFixed(1)}x</span>
            <input
              type="range"
              min="0.2"
              max="3"
              step="0.1"
              value={scale}
              onChange={(e) => setScale(parseFloat(e.target.value))}
              style={{ accentColor: 'var(--accent-primary)', cursor: 'pointer' }}
            />
          </div>
        </div>

        <Canvas shadows camera={{ position: [0, 2, 5], fov: 45 }}>
          <ambientLight intensity={0.7} />
          <directionalLight position={[10, 10, 5]} intensity={1.2} castShadow />

          <Suspense fallback={<Loader />}>
            <Stage environment={preset} intensity={0.5} contactShadow={{ opacity: 0.7, blur: 2 }}>
              {modelUrl ? (
                <LoadedModel url={modelUrl} scale={scale} wireframe={wireframe} />
              ) : (
                <FallbackBox scale={scale} wireframe={wireframe} />
              )}
            </Stage>
          </Suspense>

          <OrbitControls
            makeDefault
            autoRotate={autoRotate}
            autoRotateSpeed={1.5}
            enableDamping
            dampingFactor={0.05}
          />
        </Canvas>
      </div>
    </div>
  )
}
