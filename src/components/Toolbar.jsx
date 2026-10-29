import React from 'react'
import { Sparkles, Eye, Zap, Compass, Moon, Sun, Layers } from 'lucide-react'

export default function Toolbar({
  materialStyle,
  setMaterialStyle,
  wireframe,
  setWireframe,
  speed,
  setSpeed,
  environmentPreset,
  setEnvironmentPreset
}) {
  return (
    <div className="floating-toolbar">
      <div className="glass-panel toolbar-panel">
        <span className="toolbar-title" style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
          <Sparkles size={13} color="var(--accent-purple)" /> Material Style
        </span>
        <div className="chip-group">
          {[
            { id: 'prism', label: 'Prism' },
            { id: 'hologram', label: 'Neon' },
            { id: 'gold', label: 'Amber' },
            { id: 'dark', label: 'Obsidian' }
          ].map((item) => (
            <button
              key={item.id}
              className={`chip-btn ${materialStyle === item.id ? 'active' : ''}`}
              onClick={() => setMaterialStyle(item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      <div className="glass-panel toolbar-panel">
        <span className="toolbar-title" style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
          <Compass size={13} color="var(--accent-cyan)" /> HDRI Environment
        </span>
        <div className="chip-group">
          {['city', 'studio', 'sunset', 'night'].map((env) => (
            <button
              key={env}
              className={`chip-btn ${environmentPreset === env ? 'active' : ''}`}
              onClick={() => setEnvironmentPreset(env)}
            >
              {env.charAt(0).toUpperCase() + env.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="glass-panel toolbar-panel">
        <span className="toolbar-title" style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
          <Zap size={13} color="var(--accent-pink)" /> Display Tweaks
        </span>
        <div className="chip-group">
          <button
            className={`chip-btn ${wireframe ? 'active' : ''}`}
            onClick={() => setWireframe(!wireframe)}
          >
            Wireframe
          </button>
          <button
            className={`chip-btn ${speed === 2 ? 'active' : ''}`}
            onClick={() => setSpeed(speed === 2 ? 1 : 2)}
          >
            {speed === 2 ? '⚡ Fast' : '🐢 Normal'}
          </button>
        </div>
      </div>
    </div>
  )
}
