import React, { useState } from 'react'
import { Copy, Check, Terminal, Code2, Sparkles, Layers } from 'lucide-react'

export default function CodeSnippetGuide() {
  const [copiedId, setCopiedId] = useState(null)

  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const snippets = [
    {
      id: 'method-1',
      title: 'Method 1: Direct GLB / GLTF Loader (useGLTF + Suspense)',
      badge: 'Most Popular',
      badgeClass: 'badge-purple',
      description: 'Load any .glb or .gltf model directly from your public/ folder or URL using @react-three/drei.',
      code: `import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { useGLTF, OrbitControls, Environment, Html } from '@react-three/drei'

// 1. Define Model component using useGLTF
function Model({ url }) {
  const { scene } = useGLTF(url)
  return <primitive object={scene} scale={1.5} position={[0, -1, 0]} />
}

// 2. Preload the model for faster initial render
useGLTF.preload('/models/my-model.glb')

// 3. Render inside Canvas with Suspense fallback
export default function App() {
  return (
    <Canvas camera={{ position: [0, 2, 5], fov: 50 }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} castShadow />

      <Suspense fallback={<Html center><p>Loading Model...</p></Html>}>
        <Model url="/models/my-model.glb" />
        <Environment preset="city" />
      </Suspense>

      <OrbitControls makeDefault enableDamping />
    </Canvas>
  )
}`
    },
    {
      id: 'method-2',
      title: 'Method 2: Converting .glb to Declarative React JSX (gltfjsx)',
      badge: 'Best for Customization',
      badgeClass: 'badge-cyan',
      description: 'Convert your GLB model into a declarative React JSX component with automatic Draco texture compression.',
      code: `# 1. Run gltfjsx CLI command in terminal:
npx gltfjsx public/models/model.glb --transform --types

# Output generated file: src/components/Model.jsx
import React from 'react'
import { useGLTF } from '@react-three/drei'

export function Model(props) {
  const { nodes, materials } = useGLTF('/models/model-transformed.glb')

  return (
    <group {...props} dispose={null}>
      <mesh
        geometry={nodes.Body.geometry}
        material={materials.MetalMaterial}
        castShadow
        receiveShadow
      />
      <mesh
        geometry={nodes.Screen.geometry}
        material={materials.GlassMaterial}
      />
    </group>
  )
}

useGLTF.preload('/models/model-transformed.glb')`
    },
    {
      id: 'method-3',
      title: 'Method 3: Playing Model Animations (useAnimations)',
      badge: 'Interactive',
      badgeClass: 'badge-pink',
      description: 'Control keyframe animations embedded inside GLTF/GLB models (character walk cycles, floating items).',
      code: `import React, { useEffect, useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'

export function AnimatedModel({ animationName = 'Idle', ...props }) {
  const group = useRef()
  const { scene, animations } = useGLTF('/models/animated-character.glb')
  const { actions } = useAnimations(animations, group)

  useEffect(() => {
    // Play target animation clip (e.g., 'Idle', 'Run', 'Hover')
    if (actions[animationName]) {
      actions[animationName].reset().fadeIn(0.5).play()
    }
    return () => {
      if (actions[animationName]) {
        actions[animationName].fadeOut(0.5)
      }
    }
  }, [actions, animationName])

  return (
    <group ref={group} {...props} dispose={null}>
      <primitive object={scene} />
    </group>
  )
}`
    },
    {
      id: 'method-4',
      title: 'Method 4: Embedding Interactive Scenes from Spline.design',
      badge: 'Spline Web Export',
      badgeClass: 'badge-purple',
      description: 'Export Spline 3D glassmorphic web assets and render them seamlessly in React applications.',
      code: `// 1. Install Spline React SDK:
// npm install @splinetool/react-spline @splinetool/runtime

import Spline from '@splinetool/react-spline'

export default function SplineScene() {
  function onLoad(splineApp) {
    console.log('Spline scene fully loaded!', splineApp)
  }

  return (
    <div style={{ width: '100%', height: '600px' }}>
      <Spline 
        scene="https://prod.spline.design/6Wq1Q7YGyM-iab9i/scene.splinecode" 
        onLoad={onLoad}
      />
    </div>
  )
}`
    }
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div className="glass-panel" style={{ padding: '1.5rem 2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
          <Code2 size={24} color="var(--accent-primary)" />
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', fontWeight: 700 }}>
            React Three Fiber & GLTF Implementation Guide
          </h2>
        </div>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
          Follow these standard practices to load, optimize, and animate 3D assets in React projects using <code style={{ color: '#38bdf8' }}>@react-three/drei</code> and <code style={{ color: '#38bdf8' }}>gltfjsx</code>.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {snippets.map((snip) => (
          <div key={snip.id} className="glass-panel" style={{ padding: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.75rem' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.25rem' }}>
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', fontWeight: 600 }}>
                    {snip.title}
                  </h3>
                  <span className={`badge ${snip.badgeClass}`}>{snip.badge}</span>
                </div>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                  {snip.description}
                </p>
              </div>
            </div>

            <div className="code-box">
              <div className="code-header">
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Terminal size={14} /> React Component
                </span>
                <button
                  className="copy-btn"
                  onClick={() => copyToClipboard(snip.code, snip.id)}
                >
                  {copiedId === snip.id ? (
                    <>
                      <Check size={14} color="#10b981" /> Copied!
                    </>
                  ) : (
                    <>
                      <Copy size={14} /> Copy Code
                    </>
                  )}
                </button>
              </div>
              <pre>
                <code>{snip.code}</code>
              </pre>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
