import React, { useState, useEffect } from 'react'
import Canvas3D from './components/Canvas3D'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ModelSelectorWidget from './components/ModelSelectorWidget'
import { THEME_PRESETS, applyThemeVariables, createCustomTheme } from './theme'

export default function App() {
  const [wireframe, setWireframe] = useState(false)
  const [activeModel, setActiveModel] = useState('fan')
  const [customModelUrl, setCustomModelUrl] = useState(null)
  const [customFileName, setCustomFileName] = useState(null)

  // Default theme is Obsidian Ember (Sleek 3D Dark Mode)
  const [currentTheme, setCurrentTheme] = useState(() => {
    const saved = localStorage.getItem('portfolio_theme')
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        // Match with known preset or return saved custom theme
        const matched = THEME_PRESETS.find(p => p.id === parsed.id)
        if (matched) return matched
        return parsed
      } catch (e) {
        console.warn('Failed to parse saved theme', e)
      }
    }
    return THEME_PRESETS[0] // Obsidian Ember default
  })

  // Apply CSS custom variables whenever the theme changes
  useEffect(() => {
    applyThemeVariables(currentTheme)
    localStorage.setItem('portfolio_theme', JSON.stringify(currentTheme))
  }, [currentTheme])

  const handleSelectPreset = (preset) => {
    setCurrentTheme(preset)
  }

  const handleUpdateCustomColors = (updates) => {
    const nextBaseBg = updates.baseBg !== undefined ? updates.baseBg : currentTheme.baseBg
    const nextAccent = updates.accentColor !== undefined ? updates.accentColor : currentTheme.accentColor
    const nextMeshBase = updates.meshBaseColor !== undefined ? updates.meshBaseColor : currentTheme.meshBaseColor
    
    const customTheme = createCustomTheme(nextBaseBg, nextAccent, nextMeshBase)
    setCurrentTheme(customTheme)
  }

  return (
    <div
      className="relative min-h-screen bg-transparent overflow-x-hidden transition-colors duration-400"
      style={{ color: currentTheme.textMain }}
    >
      
      {/* Creative IT Student Background Blueprint & Code Watermarks */}
      <div className="fixed inset-0 pointer-events-none z-0 bg-tech-blueprint opacity-60">
        {/* Floating IT Code Watermark 1 */}
        <div
          className="absolute top-24 left-[5%] font-it-code text-[11px] tracking-widest select-none hidden lg:block opacity-20"
          style={{ color: currentTheme.accentColor }}
        >
          <pre>{`class EyobTesfaye implements IT_Student {
  String university = "Dire Dawa Univ";
  String major = "Information Tech";
  int gradYear = 2026;
}`}</pre>
        </div>

        {/* Floating IT Code Watermark 2 */}
        <div
          className="absolute top-1/3 right-[4%] font-it-code text-[10px] tracking-widest select-none hidden lg:block text-right opacity-20"
          style={{ color: currentTheme.accentColor }}
        >
          <pre>{`// RESTful API Endpoint
@GetMapping("/api/developer/skills")
public List<Skill> getExpertise() {
  return Arrays.asList("Java", "React", "SQL");
}`}</pre>
        </div>

        {/* Floating IT Code Watermark 3 */}
        <div
          className="absolute bottom-1/4 left-[6%] font-it-code text-[11px] tracking-widest select-none hidden md:block opacity-20"
          style={{ color: currentTheme.accentColor }}
        >
          <pre>{`01000101 01011001 01001111 01000010
// DIRE DAWA UNIVERSITY IT DEPT 2026`}</pre>
        </div>

        {/* Background IT Tech Stamp */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-mono text-[9rem] font-black uppercase tracking-tighter select-none rotate-[-6deg] whitespace-nowrap opacity-[0.03]"
          style={{ color: currentTheme.accentColor }}
        >
          IT DEVELOPER &bull; DDU
        </div>
      </div>

      {/* 3D Kinetic Background Canvas */}
      <Canvas3D
        wireframe={wireframe}
        activeModel={activeModel}
        customModelUrl={customModelUrl}
        meshBaseColor={currentTheme.meshBaseColor}
        accentColor={currentTheme.accentColor}
      />

      {/* Floating 3D Model & Color Controls Widget */}
      <ModelSelectorWidget
        activeModel={activeModel}
        setActiveModel={setActiveModel}
        customModelUrl={customModelUrl}
        setCustomModelUrl={setCustomModelUrl}
        customFileName={customFileName}
        setCustomFileName={setCustomFileName}
        currentTheme={currentTheme}
        onSelectTheme={handleSelectPreset}
        onUpdateCustomColors={handleUpdateCustomColors}
      />

      {/* Overlaid Portfolio Layout */}
      <div className="relative z-10">
        <Navbar
          wireframe={wireframe}
          onToggleWireframe={() => setWireframe(!wireframe)}
          currentTheme={currentTheme}
          onSelectTheme={handleSelectPreset}
        />
        <main>
          <Hero currentTheme={currentTheme} />
          <Projects currentTheme={currentTheme} />
          <Skills currentTheme={currentTheme} />
          <Contact currentTheme={currentTheme} />
        </main>
        <Footer currentTheme={currentTheme} />
      </div>
    </div>
  )
}
