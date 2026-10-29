import React from 'react'
import { Sparkles, Cpu, Layers, Zap, CheckCircle, GraduationCap, Award, Code2 } from 'lucide-react'

export default function Skills({ currentTheme = {} }) {
  const accent = currentTheme.accentColor || '#ff4500'
  const glow = currentTheme.accentGlow || 'rgba(255, 69, 0, 0.35)'
  const textMain = currentTheme.textMain || '#f8fafc'
  const textBody = currentTheme.textBody || '#cbd5e1'
  const textMuted = currentTheme.textMuted || '#94a3b8'

  const skillCategories = [
    {
      title: 'Web & API Development',
      icon: Layers,
      gradient: 'from-amber-600 to-orange-500',
      skills: [
        { name: 'Responsive Frontend Web Dev', level: 95 },
        { name: 'RESTful API Integration', level: 92 },
        { name: 'React.js & Tailwind CSS', level: 90 },
        { name: 'HTML5 & Modern CSS3 Styling', level: 96 },
        { name: 'Agile & Team Collaboration', level: 88 },
      ]
    },
    {
      title: 'Desktop & System Engineering',
      icon: Cpu,
      gradient: 'from-orange-500 to-amber-500',
      skills: [
        { name: 'Object-Oriented Programming (OOP)', level: 94 },
        { name: 'Java & Java Swing Desktop Apps', level: 90 },
        { name: 'System Analysis & Design', level: 88 },
        { name: 'Database Systems & Persistence', level: 85 },
        { name: 'Software Solution Architecture', level: 86 },
      ]
    },
    {
      title: 'Tooling & Open-Source',
      icon: Zap,
      gradient: 'from-amber-400 to-orange-600',
      skills: [
        { name: 'Git & GitHub Version Control', level: 94 },
        { name: 'Desktop Application GUI', level: 90 },
        { name: 'Cross-Browser Optimization', level: 92 },
        { name: 'React Three Fiber / WebGL', level: 82 },
        { name: 'System Refactoring & Debugging', level: 88 },
      ]
    }
  ]

  return (
    <section id="skills" className="relative py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10">
      
      {/* Background Soft Accent Spot */}
      <div
        className="absolute top-1/2 left-10 w-[550px] h-[320px] blur-3xl rounded-full pointer-events-none -z-10 animate-pulse opacity-20"
        style={{ backgroundColor: accent }}
      />

      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div
          className="inline-flex items-center gap-2 px-3.5 py-1 rounded-md border text-xs font-mono font-semibold uppercase tracking-wider mb-3 shadow-sm"
          style={{
            backgroundColor: `${accent}18`,
            borderColor: `${accent}40`,
            color: accent
          }}
        >
          <Sparkles className="w-3.5 h-3.5" style={{ color: accent }} />
          <span>Qualifications & Coursework</span>
        </div>
        <h2 className="font-heading text-3xl sm:text-5xl font-extrabold tracking-tight mb-4" style={{ color: textMain }}>
          Technical Expertise & Education
        </h2>
        <p className="text-base sm:text-lg font-medium" style={{ color: textBody }}>
          Combining academic rigor at Dire Dawa University with hands-on software development across web and desktop platforms.
        </p>
      </div>

      {/* Skill Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {skillCategories.map((cat, idx) => (
          <div
            key={idx}
            className="glass-panel glass-panel-interactive border p-6 sm:p-8 flex flex-col justify-between shadow-xl rounded-2xl"
            style={{ borderColor: `${accent}25` }}
          >
            <div>
              {/* Category Header */}
              <div className="flex items-center gap-4 mb-6">
                <div
                  className="w-12 h-12 rounded-2xl p-0.5 shadow-md"
                  style={{
                    background: `linear-gradient(135deg, ${accent}, #ffa000)`
                  }}
                >
                  <div className="w-full h-full bg-black/60 rounded-[14px] flex items-center justify-center">
                    <cat.icon className="w-6 h-6" style={{ color: accent }} />
                  </div>
                </div>
                <div>
                  <h3 className="font-heading text-xl font-bold" style={{ color: textMain }}>{cat.title}</h3>
                  <span className="text-xs font-mono font-bold" style={{ color: accent }}>Core Competencies</span>
                </div>
              </div>

              {/* Progress Bars */}
              <div className="space-y-4">
                {cat.skills.map((skill, sIdx) => (
                  <div key={sIdx}>
                    <div className="flex justify-between items-center text-xs mb-1.5 font-bold">
                      <span style={{ color: textMain }}>{skill.name}</span>
                      <span className="font-mono" style={{ color: accent }}>{skill.level}%</span>
                    </div>
                    <div className="w-full h-2.5 rounded-full bg-black/30 overflow-hidden border border-white/10">
                      <div
                        className="h-full rounded-full transition-all duration-1000"
                        style={{
                          width: `${skill.level}%`,
                          backgroundColor: accent
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-white/10 flex items-center gap-2 text-xs font-medium" style={{ color: textBody }}>
              <CheckCircle className="w-4 h-4 shrink-0" style={{ color: accent }} />
              <span>Verified Experience & Coursework</span>
            </div>
          </div>
        ))}
      </div>

      {/* Education & Certifications Showcase */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Education Card */}
        <div className="glass-panel border p-6 sm:p-8 shadow-xl rounded-2xl" style={{ borderColor: `${accent}25` }}>
          <div className="flex items-center gap-3 mb-6">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center shadow-sm"
              style={{
                backgroundColor: `${accent}20`,
                color: accent
              }}
            >
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-heading text-xl font-bold" style={{ color: textMain }}>Academic Background</h3>
              <span className="text-xs font-mono font-bold" style={{ color: accent }}>Degree & Coursework</span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-black/25 border border-white/10 shadow-sm">
              <span
                className="px-2.5 py-0.5 rounded font-mono text-[10px] font-bold uppercase"
                style={{
                  backgroundColor: `${accent}25`,
                  color: accent
                }}
              >
                Undergraduate Degree
              </span>
              <h4 className="font-bold text-base mt-2" style={{ color: textMain }}>B.Sc. in Information Technology</h4>
              <p className="font-mono text-xs font-bold mt-0.5" style={{ color: accent }}>Dire Dawa University &bull; Class of 2026</p>
              <p className="text-xs mt-2 font-medium" style={{ color: textBody }}>
                Focus on Software Engineering, Object-Oriented Programming (Java), Web Development, Database Management, and Network Security.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-black/25 border border-white/10 shadow-sm">
              <span className="text-[11px] font-mono uppercase tracking-wider block mb-2 font-bold" style={{ color: textMuted }}>
                Key Coursework:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {['Java Programming', 'Web Technologies', 'Database Systems', 'Algorithms & Data Structures', 'Networking & Security'].map((course, cIdx) => (
                  <span
                    key={cIdx}
                    className="px-2.5 py-1 rounded-lg border text-xs font-medium shadow-sm bg-white/5"
                    style={{
                      borderColor: `${accent}25`,
                      color: textMain
                    }}
                  >
                    {course}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Certifications & Achievements Card */}
        <div className="glass-panel border p-6 sm:p-8 shadow-xl rounded-2xl" style={{ borderColor: `${accent}25` }}>
          <div className="flex items-center gap-3 mb-6">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center shadow-sm"
              style={{
                backgroundColor: `${accent}20`,
                color: accent
              }}
            >
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-heading text-xl font-bold" style={{ color: textMain }}>Certifications & Achievements</h3>
              <span className="text-xs font-mono font-bold" style={{ color: accent }}>Verified Credentials</span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-black/25 border border-white/10 shadow-sm flex items-start gap-3">
              <Award className="w-5 h-5 shrink-0 mt-0.5" style={{ color: accent }} />
              <div>
                <h4 className="font-bold text-base" style={{ color: textMain }}>STEM Project Certificate</h4>
                <p className="text-xs font-bold mt-0.5" style={{ color: accent }}>Addis Ababa Science and Technology University (AASTU)</p>
                <p className="text-xs mt-1 font-medium" style={{ color: textBody }}>Recognized for technical project execution and innovation in STEM fields.</p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-black/25 border border-white/10 shadow-sm flex items-start gap-3">
              <Code2 className="w-5 h-5 shrink-0 mt-0.5" style={{ color: accent }} />
              <div>
                <h4 className="font-bold text-base" style={{ color: textMain }}>Active Open-Source Contributor</h4>
                <p className="text-xs font-mono font-bold mt-0.5" style={{ color: accent }}>GitHub: EYO-HUB</p>
                <p className="text-xs mt-1 font-medium" style={{ color: textBody }}>Continuous development of open-source software solutions, desktop tools, and web applications.</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
