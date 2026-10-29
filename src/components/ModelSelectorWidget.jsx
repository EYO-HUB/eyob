import React, { useState } from 'react'
import { Box, Upload, Sparkles, ExternalLink, RefreshCw, X, Palette, Sliders, Check } from 'lucide-react'
import { THEME_PRESETS } from '../theme'

export default function ModelSelectorWidget({
  activeModel,
  setActiveModel,
  customModelUrl,
  setCustomModelUrl,
  customFileName,
  setCustomFileName,
  currentTheme,
  onSelectTheme,
  onUpdateCustomColors
}) {
  const [isOpen, setIsOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('colors') // 'colors' or 'mesh'
  const [showSourcesModal, setShowSourcesModal] = useState(false)

  const handleFileUpload = (e) => {
    const file = e.target.files[0]
    if (!file) return

    if (!file.name.endsWith('.glb') && !file.name.endsWith('.gltf')) {
      alert('Please upload a valid .glb or .gltf 3D model file.')
      return
    }

    const url = URL.createObjectURL(file)
    setCustomModelUrl(url)
    setCustomFileName(file.name)
  }

  const handleSelectSample = (url, name) => {
    setCustomModelUrl(url)
    setCustomFileName(name)
  }

  const handleResetToPreset = (presetName) => {
    setCustomModelUrl(null)
    setCustomFileName(null)
    setActiveModel(presetName)
  }

  const sources = [
    {
      name: 'Sketchfab',
      url: 'https://sketchfab.com/3d-models?features=downloadable',
      description: 'Millions of downloadable free & CC-licensed GLTF/GLB models.',
      badge: 'Largest Library'
    },
    {
      name: 'Poly Pizza',
      url: 'https://poly.pizza',
      description: 'Thousands of free low-poly 3D models (<500KB) built for fast websites.',
      badge: 'Fastest Loading'
    },
    {
      name: 'Spline.design',
      url: 'https://spline.design',
      description: 'Web-based 3D design tool with thousands of glassmorphic assets.',
      badge: 'Glassmorphism'
    },
    {
      name: 'IconScout 3D',
      url: 'https://iconscout.com/3d-illustrations',
      description: 'Clean SaaS 3D illustrations, glowing tech spheres, and floating cards.',
      badge: 'UI Assets'
    }
  ]

  return (
    <div className="fixed bottom-6 right-6 z-40">
      
      {/* Trigger Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="glass-panel px-6 py-3.5 text-xs font-black shadow-2xl flex items-center gap-2.5 rounded-full hover:scale-105 transition-all cursor-pointer border-2"
        style={{
          borderColor: currentTheme.accentColor,
          boxShadow: `0 8px 30px ${currentTheme.accentGlow}`
        }}
      >
        <Palette className="w-4 h-4 animate-pulse" style={{ color: currentTheme.accentColor }} />
        <span>3D & Color Studio</span>
        <span
          className="w-2.5 h-2.5 rounded-full border border-white/50"
          style={{ backgroundColor: currentTheme.accentColor }}
        />
      </button>

      {/* Floating Control Panel */}
      {isOpen && (
        <div
          className="absolute bottom-16 right-0 w-88 glass-panel p-5 shadow-2xl flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-4 rounded-2xl max-h-[85vh] overflow-y-auto"
          style={{
            borderColor: `${currentTheme.accentColor}60`,
            boxShadow: `0 20px 50px rgba(0,0,0,0.8), 0 0 30px ${currentTheme.accentGlow}`
          }}
        >
          {/* Header */}
          <div className="flex justify-between items-center pb-2 border-b border-white/10">
            <span className="font-heading font-black text-sm flex items-center gap-2">
              <Sliders className="w-4 h-4" style={{ color: currentTheme.accentColor }} />
              <span>Customize Scene & Theme</span>
            </span>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-lg hover:bg-white/10 transition-colors opacity-75 hover:opacity-100 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Navigation Tabs */}
          <div className="grid grid-cols-2 gap-1 p-1 rounded-xl bg-black/20 border border-white/10">
            <button
              onClick={() => setActiveTab('colors')}
              className={`py-1.5 px-3 rounded-lg text-xs font-black transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                activeTab === 'colors'
                  ? 'bg-white/15 text-white shadow-sm'
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
            >
              <Palette className="w-3.5 h-3.5" style={{ color: currentTheme.accentColor }} />
              <span>Base & Colors</span>
            </button>
            <button
              onClick={() => setActiveTab('mesh')}
              className={`py-1.5 px-3 rounded-lg text-xs font-black transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                activeTab === 'mesh'
                  ? 'bg-white/15 text-white shadow-sm'
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
            >
              <Box className="w-3.5 h-3.5" style={{ color: currentTheme.accentColor }} />
              <span>3D Models</span>
            </button>
          </div>

          {/* TAB 1: Base Color & Theme Controls */}
          {activeTab === 'colors' && (
            <div className="space-y-4">
              
              {/* Presets List */}
              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider mb-2 font-bold opacity-80">
                  Base Color Presets
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {THEME_PRESETS.map((preset) => {
                    const isSelected = currentTheme.id === preset.id
                    return (
                      <button
                        key={preset.id}
                        onClick={() => onSelectTheme(preset)}
                        className={`p-2.5 rounded-xl border text-left transition-all relative overflow-hidden cursor-pointer flex flex-col justify-between ${
                          isSelected
                            ? 'ring-2 border-transparent shadow-lg'
                            : 'border-white/10 hover:border-white/30 bg-black/20'
                        }`}
                        style={{
                          backgroundColor: preset.baseBg,
                          borderColor: isSelected ? preset.accentColor : undefined,
                          ringColor: isSelected ? preset.accentColor : undefined
                        }}
                      >
                        <div className="flex items-center justify-between mb-1.5">
                          <span
                            className="font-bold text-xs truncate"
                            style={{ color: preset.textMain }}
                          >
                            {preset.name}
                          </span>
                          {isSelected && (
                            <Check className="w-3.5 h-3.5" style={{ color: preset.accentColor }} />
                          )}
                        </div>
                        <div className="flex items-center gap-1.5">
                          {/* Color dots preview */}
                          <span
                            className="w-3.5 h-3.5 rounded-full border border-white/20 shadow-sm"
                            style={{ backgroundColor: preset.baseBg }}
                            title="Base Background"
                          />
                          <span
                            className="w-3.5 h-3.5 rounded-full border border-white/20 shadow-sm"
                            style={{ backgroundColor: preset.accentColor }}
                            title="Accent Glow"
                          />
                          <span
                            className="w-3.5 h-3.5 rounded-full border border-white/20 shadow-sm"
                            style={{ backgroundColor: preset.meshBaseColor }}
                            title="Mesh Base Metal"
                          />
                          <span
                            className="text-[9px] font-mono ml-auto opacity-70"
                            style={{ color: preset.textMuted }}
                          >
                            {preset.isDark ? 'Dark' : 'Light'}
                          </span>
                        </div>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Custom Live Color Picker */}
              <div className="p-3.5 rounded-xl bg-black/25 border border-white/10 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono uppercase tracking-wider font-bold opacity-90">
                    Live Color Customizer
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/10 text-white/80">
                    Hex Controls
                  </span>
                </div>

                {/* 1. Base Background Color */}
                <div className="flex items-center justify-between gap-3">
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-white">Base Background</span>
                    <span className="text-[10px] opacity-60">Canvas & Page backdrop</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={currentTheme.baseBg.startsWith('#') ? currentTheme.baseBg : '#0a0d14'}
                      onChange={(e) => onUpdateCustomColors({ baseBg: e.target.value })}
                      className="w-8 h-8 rounded-lg border border-white/20 bg-transparent cursor-pointer p-0.5"
                    />
                    <span className="font-mono text-xs opacity-75 uppercase">
                      {currentTheme.baseBg}
                    </span>
                  </div>
                </div>

                {/* 2. 3D Accent & Glow Color */}
                <div className="flex items-center justify-between gap-3">
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-white">3D Accent & Glow</span>
                    <span className="text-[10px] opacity-60">Lights, sparkles & flame</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={currentTheme.accentColor.startsWith('#') ? currentTheme.accentColor : '#ff4500'}
                      onChange={(e) => onUpdateCustomColors({ accentColor: e.target.value })}
                      className="w-8 h-8 rounded-lg border border-white/20 bg-transparent cursor-pointer p-0.5"
                    />
                    <span className="font-mono text-xs opacity-75 uppercase">
                      {currentTheme.accentColor}
                    </span>
                  </div>
                </div>

                {/* 3. 3D Mesh Base Metal */}
                <div className="flex items-center justify-between gap-3">
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-white">3D Mesh Base Metal</span>
                    <span className="text-[10px] opacity-60">Silver/Gold/Titanium blade</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={currentTheme.meshBaseColor.startsWith('#') ? currentTheme.meshBaseColor : '#f0f4f8'}
                      onChange={(e) => onUpdateCustomColors({ meshBaseColor: e.target.value })}
                      className="w-8 h-8 rounded-lg border border-white/20 bg-transparent cursor-pointer p-0.5"
                    />
                    <span className="font-mono text-xs opacity-75 uppercase">
                      {currentTheme.meshBaseColor}
                    </span>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: 3D Model Mesh Controls */}
          {activeTab === 'mesh' && (
            <div className="space-y-4">
              
              {/* Active Model Status */}
              {customFileName ? (
                <div
                  className="p-2.5 rounded-xl border text-xs flex justify-between items-center font-bold"
                  style={{
                    backgroundColor: `${currentTheme.accentColor}15`,
                    borderColor: `${currentTheme.accentColor}40`,
                    color: currentTheme.accentColor
                  }}
                >
                  <span className="truncate font-mono font-bold">GLB: {customFileName}</span>
                  <button
                    onClick={() => handleResetToPreset('fan')}
                    className="hover:opacity-75 font-bold cursor-pointer"
                    title="Reset to preset"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <div className="text-xs font-mono font-bold">
                  Active Preset: <span className="font-bold uppercase" style={{ color: currentTheme.accentColor }}>{activeModel}</span>
                </div>
              )}

              {/* Built-in Presets */}
              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider mb-2 font-bold opacity-80">
                  Geometric Presets
                </label>
                <div className="grid grid-cols-3 gap-1.5">
                  {[
                    { id: 'fan', label: 'Duo Iris' },
                    { id: 'knot', label: 'Torus Knot' },
                    { id: 'crystal', label: 'Crystal' }
                  ].map((preset) => (
                    <button
                      key={preset.id}
                      onClick={() => handleResetToPreset(preset.id)}
                      className={`py-2 px-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        !customModelUrl && activeModel === preset.id
                          ? 'text-white shadow-md'
                          : 'bg-black/20 hover:bg-white/10 border border-white/10'
                      }`}
                      style={{
                        backgroundColor: !customModelUrl && activeModel === preset.id ? currentTheme.accentColor : undefined,
                        boxShadow: !customModelUrl && activeModel === preset.id ? `0 4px 15px ${currentTheme.accentGlow}` : undefined
                      }}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Upload Custom GLB */}
              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider mb-2 font-bold opacity-80">
                  Upload Custom Model (.glb / .gltf)
                </label>
                <label
                  className="w-full py-2.5 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 cursor-pointer transition-all shadow-sm bg-black/20 hover:bg-white/10"
                  style={{ borderColor: `${currentTheme.accentColor}50` }}
                >
                  <Upload className="w-4 h-4" style={{ color: currentTheme.accentColor }} />
                  <span>Choose .glb File</span>
                  <input type="file" accept=".glb,.gltf" onChange={handleFileUpload} className="hidden" />
                </label>
              </div>

              {/* Sample Models */}
              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider mb-2 font-bold opacity-80">
                  Test Sample Models
                </label>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleSelectSample('https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Duck/glTF-Binary/Duck.glb', 'Duck.glb')}
                    className="flex-1 py-2 px-2 rounded-xl bg-black/20 border border-white/10 text-xs hover:bg-white/10 font-bold shadow-sm cursor-pointer"
                  >
                    🦆 Duck.glb
                  </button>
                  <button
                    onClick={() => handleSelectSample('https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/DamagedHelmet/glTF-Binary/DamagedHelmet.glb', 'Helmet.glb')}
                    className="flex-1 py-2 px-2 rounded-xl bg-black/20 border border-white/10 text-xs hover:bg-white/10 font-bold shadow-sm cursor-pointer"
                  >
                    🪖 Helmet.glb
                  </button>
                </div>
              </div>

              {/* Where to find models link */}
              <button
                onClick={() => setShowSourcesModal(true)}
                className="text-xs hover:underline flex items-center gap-1 mt-1 font-bold cursor-pointer"
                style={{ color: currentTheme.accentColor }}
              >
                <span>Where to get free 3D models?</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

        </div>
      )}

      {/* Modal for 3D Asset Platforms */}
      {showSourcesModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4">
          <div className="glass-panel border p-6 max-w-lg w-full relative animate-in fade-in shadow-2xl rounded-2xl" style={{ borderColor: currentTheme.accentColor }}>
            <button
              onClick={() => setShowSourcesModal(false)}
              className="absolute top-4 right-4 hover:opacity-75 font-bold cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-heading text-xl font-bold mb-2 flex items-center gap-2">
              <Sparkles className="w-5 h-5" style={{ color: currentTheme.accentColor }} /> Where to Get Free Web 3D Models
            </h3>
            <p className="text-xs mb-6 opacity-80 font-medium">
              Download free `.glb` or `.gltf` files from these top platforms and upload them using the Model Controls widget above.
            </p>

            <div className="space-y-3">
              {sources.map((src, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-black/30 border border-white/10 flex justify-between items-center shadow-sm">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm">{src.name}</span>
                      <span
                        className="px-2 py-0.5 rounded text-[10px] font-mono font-bold"
                        style={{
                          backgroundColor: `${currentTheme.accentColor}25`,
                          color: currentTheme.accentColor
                        }}
                      >
                        {src.badge}
                      </span>
                    </div>
                    <p className="text-xs mt-1 opacity-70 font-medium">{src.description}</p>
                  </div>
                  <a
                    href={src.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-white/10 border border-white/20 hover:bg-white/20 transition-colors shadow-sm font-bold"
                    style={{ color: currentTheme.accentColor }}
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              ))}
            </div>

            <button
              onClick={() => setShowSourcesModal(false)}
              className="w-full mt-6 py-2.5 rounded-xl text-white font-bold text-xs shadow-lg cursor-pointer transition-all hover:scale-[1.02]"
              style={{
                backgroundColor: currentTheme.accentColor,
                boxShadow: `0 8px 25px ${currentTheme.accentGlow}`
              }}
            >
              Got It
            </button>
          </div>
        </div>
      )}

    </div>
  )
}
