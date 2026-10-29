import React, { useState } from 'react'
import { ArrowRight, Mail, Github, MapPin, Sparkles, Terminal, User, Download, Code2 } from 'lucide-react'
import profileImage from '../assets/profile.jpg'

export default function Hero({ currentTheme = {} }) {
  const accent = currentTheme.accentColor || '#ff4500'
  const glow = currentTheme.accentGlow || 'rgba(255, 69, 0, 0.35)'
  const textMain = currentTheme.textMain || '#f8fafc'
  const textBody = currentTheme.textBody || '#cbd5e1'
  const textMuted = currentTheme.textMuted || '#94a3b8'

  const [imgError, setImgError] = useState(false)

  return (
    <section className="relative min-h-screen pt-36 pb-24 flex flex-col justify-center px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10">
      
      {/* Background Soft Accent Spot */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] blur-3xl rounded-full pointer-events-none -z-10 animate-pulse opacity-25"
        style={{ backgroundColor: accent }}
      />

      {/* Technical Frame Outer Container with Corner Crosshairs */}
      <div
        className="relative border rounded-2xl p-6 sm:p-10 lg:p-14 glass-panel shadow-2xl backdrop-blur-2xl"
        style={{
          borderColor: `${accent}35`,
          boxShadow: `0 20px 50px -10px rgba(0,0,0,0.6), 0 0 30px ${glow}`
        }}
      >
        
        {/* Architectural Corner Crosshair Indicators */}
        <div className="absolute -top-2.5 -left-2.5 w-5 h-5 flex items-center justify-center font-mono text-xs font-bold" style={{ color: accent }}>+</div>
        <div className="absolute -top-2.5 -right-2.5 w-5 h-5 flex items-center justify-center font-mono text-xs font-bold" style={{ color: accent }}>+</div>
        <div className="absolute -bottom-2.5 -left-2.5 w-5 h-5 flex items-center justify-center font-mono text-xs font-bold" style={{ color: accent }}>+</div>
        <div className="absolute -bottom-2.5 -right-2.5 w-5 h-5 flex items-center justify-center font-mono text-xs font-bold" style={{ color: accent }}>+</div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Headline Statement & Bio */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Status Pill Badge */}
            <div
              className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border text-xs font-mono font-semibold uppercase tracking-widest shadow-sm"
              style={{
                backgroundColor: `${accent}18`,
                borderColor: `${accent}40`,
                color: accent
              }}
            >
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: accent }} />
              <MapPin className="w-3.5 h-3.5" style={{ color: accent }} />
              <span>DIRE DAWA, ETHIOPIA &bull; SOFTWARE DEVELOPER</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-2">
              <h2 className="text-xs font-mono uppercase tracking-[0.3em] font-semibold" style={{ color: textMuted }}>
                EYOB TESFAYE ASEFA &bull; IT STUDENT
              </h2>
              <h1 className="font-heading text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight uppercase leading-[1.08] glow-title" style={{ color: textMain }}>
                Round & Round<br />
                <span
                  className="text-transparent bg-clip-text"
                  style={{
                    backgroundImage: `linear-gradient(135deg, ${accent}, #ffa726)`
                  }}
                >
                  We Build It Better
                </span>
              </h1>
            </div>

            {/* Subtitle Bio from CV */}
            <p className="text-base sm:text-lg max-w-xl leading-relaxed font-medium" style={{ color: textBody }}>
              Information Technology developer at <strong style={{ color: textMain }} className="font-bold">Dire Dawa University</strong>. Specialized in responsive web applications, desktop system engineering (Java/OOP), and RESTful API integration.
            </p>

            {/* Action Buttons & Links */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#projects"
                className="px-7 py-3.5 rounded-xl font-bold text-sm text-white shadow-xl hover:scale-105 transition-all flex items-center gap-2 cursor-pointer"
                style={{
                  backgroundColor: accent,
                  boxShadow: `0 8px 30px ${glow}`
                }}
              >
                <span>Explore Projects</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </a>

              {/* CV Download Button */}
              <a
                href="/Eyob_Tesfaye_CV.pdf"
                download="Eyob_Tesfaye_CV.pdf"
                className="px-6 py-3.5 rounded-xl font-bold text-sm border transition-all flex items-center gap-2 shadow-md hover:scale-105 cursor-pointer bg-white/10 hover:bg-white/15"
                style={{
                  borderColor: `${accent}40`,
                  color: textMain
                }}
              >
                <Download className="w-4 h-4" style={{ color: accent }} />
                <span>Download CV</span>
              </a>

              <a
                href="https://github.com/EYO-HUB"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 rounded-xl font-bold text-sm border transition-all flex items-center gap-2 shadow-md hover:scale-105 cursor-pointer bg-white/10 hover:bg-white/15"
                style={{
                  borderColor: `${accent}40`,
                  color: textMain
                }}
              >
                <Github className="w-4 h-4" style={{ color: accent }} />
                <span>GitHub (EYO-HUB)</span>
              </a>

              <a
                href="#contact"
                className="px-6 py-3.5 rounded-xl font-bold text-sm border transition-all flex items-center gap-2 shadow-md hover:scale-105 cursor-pointer bg-white/10 hover:bg-white/15"
                style={{
                  borderColor: `${accent}40`,
                  color: textMain
                }}
              >
                <Mail className="w-4 h-4" style={{ color: accent }} />
                <span>Contact</span>
              </a>
            </div>

            {/* Tech Specs Footer Bar inside Hero Card */}
            <div className="pt-6 border-t border-white/10 grid grid-cols-3 gap-4 text-xs font-mono">
              <div>
                <span className="block font-medium opacity-60" style={{ color: textMuted }}>INSTITUTE</span>
                <span className="font-bold text-sm" style={{ color: textMain }}>Dire Dawa Univ</span>
              </div>
              <div>
                <span className="block font-medium opacity-60" style={{ color: textMuted }}>SPECIALTY</span>
                <span className="font-bold text-sm" style={{ color: accent }}>Web & Desktop</span>
              </div>
              <div>
                <span className="block font-medium opacity-60" style={{ color: textMuted }}>STATUS</span>
                <span className="font-bold text-sm" style={{ color: textMain }}>Class of 2026</span>
              </div>
            </div>

          </div>

          {/* Right Column: Modern Animated Profile Photo Frame & 3D Focal Card */}
          <div
            className="lg:col-span-5 relative min-h-[380px] flex flex-col items-center justify-between p-6 sm:p-8 border rounded-2xl glass-panel shadow-xl"
            style={{ borderColor: `${accent}35` }}
          >
            
            {/* Top Micro Header */}
            <div className="w-full flex justify-between items-center text-[11px] font-mono">
              <span className="flex items-center gap-1.5 font-bold uppercase tracking-wider" style={{ color: accent }}>
                <Terminal className="w-3.5 h-3.5" style={{ color: accent }} />
                <span>DEVELOPER_PROFILE</span>
              </span>
              <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 font-bold flex items-center gap-1.5 text-[10px]">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                ACTIVE
              </span>
            </div>

            {/* Center Animated Profile Photo Frame */}
            <div className="relative my-6 group flex flex-col items-center">
              
              {/* Outer Rotating Neon Aura Ring Animation */}
              <div
                className="absolute -inset-2.5 rounded-full opacity-70 blur-md animate-spin-slow group-hover:opacity-100 transition-opacity"
                style={{
                  background: `linear-gradient(135deg, ${accent}, #ffd54f)`
                }}
              />
              <div
                className="absolute -inset-1 rounded-full opacity-40 animate-pulse"
                style={{ backgroundColor: accent }}
              />

              {/* Avatar Photo Frame Box */}
              <div
                className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-full overflow-hidden border-4 border-white/60 shadow-2xl flex items-center justify-center bg-black/60 z-10"
              >
                {!imgError ? (
                  <img
                    src={profileImage}
                    alt="Eyob Tesfaye Profile"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={() => setImgError(true)}
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-white/80">
                    <User className="w-16 h-16 stroke-[1.5] animate-bounce" style={{ color: accent }} />
                    <span className="text-[10px] font-mono font-bold uppercase mt-1" style={{ color: textMain }}>
                      EYOB TESFAYE
                    </span>
                  </div>
                )}
              </div>

              {/* Developer Title Pill */}
              <div
                className="mt-3.5 inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full border text-xs font-mono font-semibold shadow-md bg-white/5 backdrop-blur-md z-10"
                style={{
                  borderColor: `${accent}40`,
                  color: textMain
                }}
              >
                <Code2 className="w-3.5 h-3.5" style={{ color: accent }} />
                <span>Full-Stack & 3D Dev</span>
              </div>
            </div>

            {/* Bottom Tech Status */}
            <div className="w-full flex justify-between items-center text-[10px] font-mono pt-3 border-t border-white/10 font-bold" style={{ color: textMuted }}>
              <span>DIRE DAWA UNIVERSITY</span>
              <span>CLASS OF 2026</span>
            </div>

          </div>

        </div>

      </div>

    </section>
  )
}
