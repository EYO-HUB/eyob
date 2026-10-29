import React from 'react'
import { ExternalLink, Sparkles, Box, Layers, ShieldCheck, Zap, Download } from 'lucide-react'

export default function AssetCatalog() {
  const platforms = [
    {
      category: '1. Interactive Web-Ready Platforms (Easiest)',
      items: [
        {
          name: 'Spline.design',
          badge: '🌟 Best Overall for Web',
          badgeClass: 'badge-purple',
          description: 'Web-based 3D design tool with thousands of ready-to-use 3D UI assets, glassmorphism scenes, and real-time lighting control.',
          keyFeature: 'Exports directly as a React component (@splinetool/react-spline), WebGL embed, or standard Three.js canvas.',
          formats: ['.splinecode', 'React Component', 'WebGL Embed', '.gltf'],
          url: 'https://spline.design'
        },
        {
          name: 'LottieFiles 3D / IconScout',
          badge: 'UI & Micro-Animations',
          badgeClass: 'badge-cyan',
          description: 'Web-friendly 3D icons, SaaS cards, glowing spheres, and floating tech elements optimized for web and mobile UIs.',
          keyFeature: 'Download lightweight interactive Lottie JSONs or GLTF models ready for standard WebGL rendering.',
          formats: ['.gltf', '.glb', '.png', 'Lottie JSON'],
          url: 'https://iconscout.com/3d-illustrations'
        }
      ]
    },
    {
      category: '2. Free 3D Model Repositories (For Three.js & R3F)',
      items: [
        {
          name: 'Sketchfab',
          badge: 'Largest Library',
          badgeClass: 'badge-purple',
          description: 'Millions of downloadable low-poly and high-detail 3D models available under Creative Commons licenses.',
          keyFeature: 'Filter directly by downloadable `.gltf` / `.glb` format with PBR materials and rigged animations.',
          formats: ['.gltf', '.glb', '.obj', '.fbx'],
          url: 'https://sketchfab.com'
        },
        {
          name: 'Poly Pizza',
          badge: '⚡ Ultra-Fast Load Speeds',
          badgeClass: 'badge-cyan',
          description: 'Thousands of low-poly 3D models specifically curated and optimized for fast website loading speeds.',
          keyFeature: 'Clean geometry, tiny file sizes (<500KB), perfect for mobile-responsive 3D web applications.',
          formats: ['.glb', '.gltf'],
          url: 'https://poly.pizza'
        },
        {
          name: 'CGTrader',
          badge: 'Free & Premium',
          badgeClass: 'badge-pink',
          description: 'Large marketplace with filters for free low-poly web 3D assets, furniture, vehicles, and futuristic UI objects.',
          keyFeature: 'Filter by free license and web-ready formats (.glb/.gltf).',
          formats: ['.glb', '.gltf', '.fbx', '.obj'],
          url: 'https://www.cgtrader.com/free-3d-models'
        },
        {
          name: 'TurboSquid',
          badge: 'Pro Quality',
          badgeClass: 'badge-pink',
          description: 'High-end 3D catalog with professional 3D assets, architectural models, and product renders.',
          keyFeature: 'StemCell conversion pipeline for web compatibility.',
          formats: ['.gltf', '.glb', '.max', '.obj'],
          url: 'https://www.turbosquid.com'
        }
      ]
    }
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div className="glass-panel" style={{ padding: '1.5rem 2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
          <Sparkles size={24} color="var(--accent-secondary)" />
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', fontWeight: 700 }}>
            Top 3D Model Platforms & Web Asset Sources
          </h2>
        </div>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
          Curated collection of the best repositories for web-ready 3D models, glassmorphic UI elements, and interactive scenes.
        </p>
      </div>

      {platforms.map((sec, idx) => (
        <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', color: '#e2e8f0', fontWeight: 600 }}>
            {sec.category}
          </h3>

          <div className="grid-2">
            {sec.items.map((item, itemIdx) => (
              <div key={itemIdx} className="glass-panel glass-panel-interactive platform-card">
                <div>
                  <div className="platform-header">
                    <div className="platform-icon">
                      <Box size={22} />
                    </div>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.15rem', fontWeight: 700 }}>
                          {item.name}
                        </h4>
                        <span className={`badge ${item.badgeClass}`}>{item.badge}</span>
                      </div>
                    </div>
                  </div>

                  <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', lineHeight: '1.5', marginBottom: '0.75rem' }}>
                    {item.description}
                  </p>

                  <div style={{ background: 'rgba(255,255,255,0.03)', padding: '0.75rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)', marginBottom: '1rem' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent-secondary)', display: 'flex', alignItems: 'center', gap: '0.35rem', marginBottom: '0.25rem' }}>
                      <Zap size={12} /> Key Feature
                    </span>
                    <p style={{ fontSize: '0.825rem', color: '#cbd5e1' }}>{item.keyFeature}</p>
                  </div>
                </div>

                <div>
                  <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap', marginBottom: '0.75rem' }}>
                    {item.formats.map((fmt, fIdx) => (
                      <span key={fIdx} style={{ fontSize: '0.7rem', padding: '0.2rem 0.5rem', background: 'rgba(255,255,255,0.06)', borderRadius: '4px', color: 'var(--text-muted)' }}>
                        {fmt}
                      </span>
                    ))}
                  </div>

                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="custom-link"
                  >
                    <span>Visit {item.name}</span>
                    <ExternalLink size={14} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
