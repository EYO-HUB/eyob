import React from 'react'
import { ChevronUp } from 'lucide-react'

export default function Footer({ currentTheme = {} }) {
  const accent = currentTheme.accentColor || '#ff4500'
  const textMain = currentTheme.textMain || '#f8fafc'
  const textMuted = currentTheme.textMuted || '#94a3b8'

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer
      className="relative z-10 border-t glass-panel py-12 px-4 sm:px-6 lg:px-8 shadow-2xl backdrop-blur-2xl"
      style={{ borderColor: `${accent}25` }}
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-mono font-bold text-xs shadow-md"
            style={{
              backgroundColor: accent
            }}
          >
            ET
          </div>
          <div>
            <span className="font-heading font-bold text-lg block" style={{ color: textMain }}>Eyob Tesfaye Asefa</span>
            <p className="text-xs font-mono font-bold mt-0.5" style={{ color: accent }}>
              © {new Date().getFullYear()} Eyob Tesfaye Asefa &bull; Dire Dawa University, Ethiopia.
            </p>
          </div>
        </div>

        {/* Links */}
        <div className="flex items-center gap-6 text-sm font-bold">
          <a href="#projects" className="hover:opacity-100 opacity-75 transition-opacity" style={{ color: textMain }}>Projects</a>
          <a href="#skills" className="hover:opacity-100 opacity-75 transition-opacity" style={{ color: textMain }}>Skills</a>
          <a href="#contact" className="hover:opacity-100 opacity-75 transition-opacity" style={{ color: textMain }}>Contact</a>
        </div>

        {/* Back to top button */}
        <button
          onClick={scrollToTop}
          className="p-3 px-5 rounded-full border hover:bg-white/10 transition-all shadow-md flex items-center gap-2 text-xs font-mono font-bold hover:scale-105 cursor-pointer"
          style={{
            borderColor: `${accent}40`,
            color: textMain
          }}
        >
          <span>BACK TO TOP</span>
          <ChevronUp className="w-4 h-4 stroke-[3]" style={{ color: accent }} />
        </button>

      </div>
    </footer>
  )
}
