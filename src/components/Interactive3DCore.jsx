import React, { useRef, useLayoutEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Float, Sparkles, ContactShadows, Environment, MeshDistortMaterial, MeshWobbleMaterial } from '@react-three/drei'
import * as THREE from 'three'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function SpatialCore({ materialStyle, wireframe, speed }) {
  const outerMeshRef = useRef()
  const innerMeshRef = useRef()
  const groupRef = useRef()

  // Setup GSAP ScrollTrigger timeline to drive 3D transformations
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: '#scroll-root',
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1.2,
        },
      })

      // Section 1 -> Section 2 (Hero to Features): Rotate & shift to right side
      tl.to(groupRef.current.position, {
        x: 2.2,
        y: -0.2,
        z: 0.5,
        duration: 2,
        ease: 'power2.inOut',
      })
      .to(groupRef.current.rotation, {
        x: Math.PI * 1.2,
        y: Math.PI * 1.8,
        z: Math.PI * 0.5,
        duration: 2,
        ease: 'power2.inOut',
      }, '<')

      // Section 2 -> Section 3 (Features to Shader Tech): Zoom & shift to left side
      .to(groupRef.current.position, {
        x: -2.2,
        y: 0.3,
        z: 1,
        duration: 2,
        ease: 'power2.inOut',
      })
      .to(groupRef.current.rotation, {
        x: Math.PI * 2.5,
        y: Math.PI * 3.2,
        duration: 2,
        ease: 'power2.inOut',
      }, '<')
      .to(outerMeshRef.current.scale, {
        x: 1.35,
        y: 1.35,
        z: 1.35,
        duration: 2,
      }, '<')

      // Section 3 -> Section 4 (Shader Tech to Metrics): Move center & zoom in slightly
      .to(groupRef.current.position, {
        x: 0,
        y: 0.5,
        z: 1.5,
        duration: 2,
        ease: 'power2.inOut',
      })
      .to(groupRef.current.rotation, {
        x: Math.PI * 4,
        y: Math.PI * 4.5,
        duration: 2,
      }, '<')

      // Section 4 -> Section 5 (Metrics to Final CTA): Epic center view
      .to(groupRef.current.position, {
        x: 0,
        y: 0,
        z: 0,
        duration: 2,
        ease: 'power2.inOut',
      })
      .to(outerMeshRef.current.scale, {
        x: 1.1,
        y: 1.1,
        z: 1.1,
        duration: 2,
      }, '<')
    })

    return () => ctx.revert()
  }, [])

  // Continuous subtle rotation & float idle animation
  useFrame((state, delta) => {
    const timeSpeed = speed || 1
    if (outerMeshRef.current) {
      outerMeshRef.current.rotation.y += delta * 0.4 * timeSpeed
      outerMeshRef.current.rotation.x += delta * 0.2 * timeSpeed
    }
    if (innerMeshRef.current) {
      innerMeshRef.current.rotation.y -= delta * 0.6 * timeSpeed
      innerMeshRef.current.rotation.z += delta * 0.3 * timeSpeed
    }
  })

  // Material selection based on UI panel state
  const renderMaterial = () => {
    switch (materialStyle) {
      case 'hologram':
        return (
          <MeshDistortMaterial
            color="#06b6d4"
            emissive="#0891b2"
            emissiveIntensity={0.5}
            roughness={0.1}
            metalness={0.9}
            distort={0.45}
            speed={3}
            wireframe={wireframe}
          />
        )
      case 'gold':
        return (
          <meshPhysicalMaterial
            color="#f59e0b"
            roughness={0.15}
            metalness={0.9}
            clearcoat={1}
            clearcoatRoughness={0.1}
            transmission={0.4}
            thickness={1}
            wireframe={wireframe}
          />
        )
      case 'dark':
        return (
          <meshStandardMaterial
            color="#1e1b4b"
            roughness={0.2}
            metalness={0.95}
            wireframe={wireframe}
          />
        )
      case 'prism':
      default:
        return (
          <meshPhysicalMaterial
            color="#a855f7"
            roughness={0.1}
            metalness={0.2}
            transmission={0.85}
            ior={1.6}
            thickness={1.5}
            specularIntensity={1}
            wireframe={wireframe}
          />
        )
    }
  }

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Outer Floating Spatial Geometry */}
      <Float speed={2} rotationIntensity={1} floatIntensity={1.2}>
        <mesh ref={outerMeshRef} castShadow receiveShadow>
          <torusKnotGeometry args={[1.2, 0.38, 128, 32]} />
          {renderMaterial()}
        </mesh>
      </Float>

      {/* Inner Glowing Crystal Core */}
      <mesh ref={innerMeshRef} scale={0.65}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial
          color="#ec4899"
          emissive="#be185d"
          emissiveIntensity={1.2}
          wireframe={wireframe}
        />
      </mesh>

      {/* Ambient Particle Dust */}
      <Sparkles
        count={80}
        scale={8}
        size={3}
        speed={0.4}
        opacity={0.6}
        color={materialStyle === 'gold' ? '#f59e0b' : '#38bdf8'}
      />
    </group>
  )
}
