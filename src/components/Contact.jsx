import React, { useState } from 'react'
import { Mail, MapPin, Clock, Send, CheckCircle2, Github } from 'lucide-react'

export default function Contact({ currentTheme = {} }) {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const accent = currentTheme.accentColor || '#ff4500'
  const glow = currentTheme.accentGlow || 'rgba(255, 69, 0, 0.35)'
  const textMain = currentTheme.textMain || '#f8fafc'
  const textBody = currentTheme.textBody || '#cbd5e1'
  const textMuted = currentTheme.textMuted || '#94a3b8'

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSubmitted(true)
      setFormData({ name: '', email: '', subject: '', message: '' })
      setTimeout(() => setSubmitted(false), 5000)
    }, 1000)
  }

  return (
    <section id="contact" className="relative py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10">
      
      {/* Background Soft Accent Spot */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[550px] h-[320px] blur-3xl rounded-full pointer-events-none -z-10 animate-pulse opacity-20"
        style={{ backgroundColor: accent }}
      />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div
          className="inline-flex items-center gap-2 px-3.5 py-1 rounded-md border text-xs font-mono font-semibold uppercase tracking-wider mb-3 shadow-sm"
          style={{
            backgroundColor: `${accent}18`,
            borderColor: `${accent}40`,
            color: accent
          }}
        >
          <Mail className="w-3.5 h-3.5" style={{ color: accent }} />
          <span>Get In Touch</span>
        </div>
        <h2 className="font-heading text-3xl sm:text-5xl font-extrabold tracking-tight mb-4" style={{ color: textMain }}>
          Let's Build Something Great
        </h2>
        <p className="text-base sm:text-lg font-medium" style={{ color: textBody }}>
          Have a web application project, desktop software inquiry, or software development opportunity? Send me a message!
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Contact Info Sidebar */}
        <div className="space-y-4">
          <div className="glass-panel border p-6 shadow-xl rounded-2xl" style={{ borderColor: `${accent}25` }}>
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 shadow-sm"
              style={{
                backgroundColor: `${accent}20`,
                color: accent
              }}
            >
              <Mail className="w-6 h-6" />
            </div>
            <h4 className="font-heading font-bold text-lg" style={{ color: textMain }}>Direct Email</h4>
            <p className="text-xs mt-1 mb-3 font-medium" style={{ color: textBody }}>Feel free to reach out directly via email.</p>
            <a
              href="mailto:eyobtesfaye078@gmail.com"
              className="font-mono text-base font-bold hover:underline block break-all"
              style={{ color: accent }}
            >
              eyobtesfaye078@gmail.com
            </a>
          </div>

          <div className="glass-panel border p-6 shadow-xl rounded-2xl" style={{ borderColor: `${accent}25` }}>
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 shadow-sm"
              style={{
                backgroundColor: `${accent}20`,
                color: accent
              }}
            >
              <MapPin className="w-6 h-6" />
            </div>
            <h4 className="font-heading font-bold text-lg" style={{ color: textMain }}>Campus Location</h4>
            <p className="text-xs mt-1 mb-2 font-medium" style={{ color: textBody }}>Dire Dawa University (DDU), Ethiopia</p>
            <span className="font-mono text-xs font-bold" style={{ color: accent }}>Department of Information Technology</span>
          </div>

          <div className="glass-panel border p-6 shadow-xl rounded-2xl" style={{ borderColor: `${accent}25` }}>
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 shadow-sm"
              style={{
                backgroundColor: `${accent}20`,
                color: accent
              }}
            >
              <Clock className="w-6 h-6" />
            </div>
            <h4 className="font-heading font-bold text-lg" style={{ color: textMain }}>GitHub Profiles & Repos</h4>
            <p className="text-xs mt-1 mb-3 font-medium" style={{ color: textBody }}>Inspect source code repositories and commit logs.</p>
            <a
              href="https://github.com/EYO-HUB"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-base font-bold hover:underline block"
              style={{ color: accent }}
            >
              github.com/EYO-HUB &rarr;
            </a>
          </div>
        </div>

        {/* Form Panel */}
        <div
          className="lg:col-span-2 glass-panel border p-6 sm:p-10 relative shadow-2xl rounded-2xl"
          style={{ borderColor: `${accent}30` }}
        >
          
          {submitted && (
            <div
              className="mb-6 p-4 rounded-xl border text-sm flex items-center gap-3 animate-in fade-in font-bold shadow-sm"
              style={{
                backgroundColor: `${accent}20`,
                borderColor: accent,
                color: textMain
              }}
            >
              <CheckCircle2 className="w-5 h-5 shrink-0" style={{ color: accent }} />
              <span>Thank you! Your message has been sent successfully. Eyob will get back to you soon.</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider mb-2 font-bold" style={{ color: textMuted }}>
                  Your Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Sarah Jenkins"
                  className="w-full px-4 py-3 rounded-xl bg-black/25 border border-white/15 text-sm focus:outline-none transition-all font-medium shadow-sm"
                  style={{
                    color: textMain,
                    borderColor: 'rgba(255, 255, 255, 0.15)'
                  }}
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider mb-2 font-bold" style={{ color: textMuted }}>
                  Your Email *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="sarah@company.com"
                  className="w-full px-4 py-3 rounded-xl bg-black/25 border border-white/15 text-sm focus:outline-none transition-all font-medium shadow-sm"
                  style={{
                    color: textMain,
                    borderColor: 'rgba(255, 255, 255, 0.15)'
                  }}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider mb-2 font-bold" style={{ color: textMuted }}>
                Subject *
              </label>
              <input
                type="text"
                required
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                placeholder="Project Inquiry / Software Opportunity"
                className="w-full px-4 py-3 rounded-xl bg-black/25 border border-white/15 text-sm focus:outline-none transition-all font-medium shadow-sm"
                style={{
                  color: textMain,
                  borderColor: 'rgba(255, 255, 255, 0.15)'
                }}
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider mb-2 font-bold" style={{ color: textMuted }}>
                Message *
              </label>
              <textarea
                required
                rows={5}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Tell me about your software development goals, project requirements, or opportunity..."
                className="w-full px-4 py-3 rounded-xl bg-black/25 border border-white/15 text-sm focus:outline-none transition-all font-medium shadow-sm"
                style={{
                  color: textMain,
                  borderColor: 'rgba(255, 255, 255, 0.15)'
                }}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-xl font-bold text-sm text-white shadow-xl hover:scale-[1.01] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              style={{
                backgroundColor: accent,
                boxShadow: `0 8px 30px ${glow}`
              }}
            >
              {loading ? (
                <span>Sending Message...</span>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Send Message to Eyob</span>
                </>
              )}
            </button>
          </form>
        </div>

      </div>
    </section>
  )
}
