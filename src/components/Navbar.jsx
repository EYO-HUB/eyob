import React, { useState, useEffect } from 'react'
import { Sparkles, Menu, X, FolderGit2, Cpu, Mail, Palette } from 'lucide-react'
import { THEME_PRESETS } from '../theme'

export default function Navbar({
  onToggleWireframe,
  wireframe,
  currentTheme,
  onSelectTheme
}) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [themeDropdownOpen, setThemeDropdownOpen] = useState(false)
  const [profilePhotoFailed, setProfilePhotoFailed] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const navLinks = [
    { name: 'Projects', href: '#projects', icon: FolderGit2 },
    { name: 'Skills', href: '#skills', icon: Cpu },
    { name: 'Contact', href: '#contact', icon: Mail },
  ]

  const cycleTheme = () => {
    const currentIndex = THEME_PRESETS.findIndex(t => t.id === currentTheme.id)
    const nextIndex = (currentIndex + 1) % THEME_PRESETS.length
    onSelectTheme(THEME_PRESETS[nextIndex])
  }

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'py-2' : 'py-4'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav
          className="glass-panel px-6 py-3.5 flex items-center justify-between shadow-2xl rounded-2xl border"
          style={{
            borderColor: `${currentTheme.accentColor}35`,
            boxShadow: `0 10px 35px -5px rgba(0,0,0,0.5), 0 0 20px ${currentTheme.accentGlow}`
          }}
        >
          {/* Logo & Name */}
          <a href="#" className="flex items-center gap-3.5 group">
            <div
              className="w-11 h-11 rounded-xl p-0.5 shadow-lg group-hover:scale-105 transition-transform shrink-0 overflow-hidden"
              style={{
                background: `linear-gradient(135deg, ${currentTheme.accentColor}, ${currentTheme.meshBaseColor})`,
                boxShadow: `0 4px 15px ${currentTheme.accentGlow}`
              }}
            >
              <div className="w-full h-full bg-black/80 rounded-[10px] flex items-center justify-center font-bold text-white text-sm font-mono shadow-inner overflow-hidden">
                {!profilePhotoFailed ? (
                  <img
                    src="/profile.jpg"
                    alt="Eyob Tesfaye"
                    className="w-full h-full object-cover"
                    onError={() => setProfilePhotoFailed(true)}
                  />
                ) : (
                  'ET'
                )}
              </div>
            </div>
            <div>
              <span
                className="font-heading font-black tracking-tight text-xl sm:text-2xl uppercase block leading-none py-0.5"
                style={{
                  color: currentTheme.textMain
                }}
              >
                Eyob Tesfaye
              </span>
              <span
                className="block text-[11px] font-mono uppercase tracking-widest font-bold mt-1"
                style={{ color: currentTheme.accentColor }}
              >
                IT Developer &bull; Dire Dawa Univ
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="font-bold text-sm transition-all flex items-center gap-2 px-3 py-1.5 rounded-lg opacity-85 hover:opacity-100 hover:bg-white/10"
                style={{ color: currentTheme.textMain }}
              >
                <link.icon className="w-4 h-4" style={{ color: currentTheme.accentColor }} />
                <span>{link.name}</span>
              </a>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center gap-3">
            
            {/* Quick Theme Cycle Button */}
            <div className="relative">
              <button
                onClick={() => setThemeDropdownOpen(!themeDropdownOpen)}
                className="px-3 py-2 rounded-xl text-xs font-mono font-bold border transition-all flex items-center gap-1.5 cursor-pointer hover:bg-white/10"
                style={{
                  borderColor: `${currentTheme.accentColor}50`,
                  color: currentTheme.textMain
                }}
                title="Switch Theme & Base Color"
              >
                <Palette className="w-3.5 h-3.5" style={{ color: currentTheme.accentColor }} />
                <span className="hidden lg:inline">{currentTheme.name}</span>
                <span
                  className="w-2.5 h-2.5 rounded-full border border-white/40"
                  style={{ backgroundColor: currentTheme.accentColor }}
                />
              </button>

              {/* Theme Dropdown */}
              {themeDropdownOpen && (
                <div
                  className="absolute right-0 mt-2 w-56 glass-panel p-2 shadow-2xl rounded-xl z-50 border space-y-1 animate-in fade-in slide-in-from-top-2"
                  style={{ borderColor: `${currentTheme.accentColor}40` }}
                >
                  <div className="px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider opacity-60 font-bold">
                    Select Base Color Theme
                  </div>
                  {THEME_PRESETS.map((preset) => (
                    <button
                      key={preset.id}
                      onClick={() => {
                        onSelectTheme(preset)
                        setThemeDropdownOpen(false)
                      }}
                      className={`w-full px-2.5 py-1.5 rounded-lg text-xs font-bold flex items-center justify-between transition-all cursor-pointer ${
                        currentTheme.id === preset.id ? 'bg-white/20' : 'hover:bg-white/10 opacity-80 hover:opacity-100'
                      }`}
                      style={{ color: currentTheme.textMain }}
                    >
                      <span className="truncate">{preset.name}</span>
                      <div className="flex items-center gap-1.5 shrink-0">
                        <span className="w-3 h-3 rounded-full border border-white/20" style={{ backgroundColor: preset.baseBg }} />
                        <span className="w-3 h-3 rounded-full" style={{ backgroundColor: preset.accentColor }} />
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Wireframe Toggle */}
            <button
              onClick={onToggleWireframe}
              className={`px-3 py-2 rounded-xl text-xs font-mono font-bold border transition-all cursor-pointer ${
                wireframe
                  ? 'text-white shadow-md'
                  : 'hover:bg-white/10'
              }`}
              style={{
                backgroundColor: wireframe ? currentTheme.accentColor : 'transparent',
                borderColor: `${currentTheme.accentColor}60`,
                color: wireframe ? '#ffffff' : currentTheme.textMain
              }}
            >
              Wireframe: {wireframe ? 'ON' : 'OFF'}
            </button>

            {/* Hire Me CTA */}
            <a
              href="#contact"
              className="px-5 py-2 rounded-full font-bold text-xs text-white shadow-lg hover:scale-105 transition-all duration-200 cursor-pointer"
              style={{
                backgroundColor: currentTheme.accentColor,
                boxShadow: `0 4px 20px ${currentTheme.accentGlow}`
              }}
            >
              Hire Me
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl border opacity-90 hover:opacity-100 cursor-pointer"
            style={{
              borderColor: `${currentTheme.accentColor}50`,
              color: currentTheme.textMain
            }}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </nav>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div
            className="md:hidden mt-2 glass-panel p-5 flex flex-col gap-4 animate-in fade-in slide-in-from-top-4 border rounded-2xl shadow-2xl"
            style={{ borderColor: `${currentTheme.accentColor}40` }}
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="font-bold text-base py-2 flex items-center gap-2"
                style={{ color: currentTheme.textMain }}
              >
                <link.icon className="w-5 h-5" style={{ color: currentTheme.accentColor }} />
                <span>{link.name}</span>
              </a>
            ))}
            
            <div className="pt-2 border-t border-white/10 flex flex-col gap-2.5">
              <button
                onClick={cycleTheme}
                className="w-full py-2.5 rounded-xl text-xs font-mono font-bold border flex items-center justify-center gap-2 cursor-pointer bg-white/10"
                style={{ borderColor: `${currentTheme.accentColor}50`, color: currentTheme.textMain }}
              >
                <Palette className="w-4 h-4" style={{ color: currentTheme.accentColor }} />
                <span>Theme: {currentTheme.name}</span>
              </button>

              <button
                onClick={onToggleWireframe}
                className="w-full py-2.5 rounded-xl text-xs font-mono font-bold border cursor-pointer"
                style={{
                  backgroundColor: wireframe ? currentTheme.accentColor : 'transparent',
                  borderColor: `${currentTheme.accentColor}60`,
                  color: wireframe ? '#ffffff' : currentTheme.textMain
                }}
              >
                Wireframe: {wireframe ? 'ON' : 'OFF'}
              </button>
              
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-2.5 rounded-xl font-bold text-sm text-white shadow-md"
                style={{ backgroundColor: currentTheme.accentColor }}
              >
                Hire Me
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
