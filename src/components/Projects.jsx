import React, { useState } from 'react'
import { ExternalLink, Github, Sparkles, Layers, Box, Eye, X, CheckCircle2 } from 'lucide-react'

export default function Projects({ currentTheme = {} }) {
  const [activeFilter, setActiveFilter] = useState('all')
  const [selectedProject, setSelectedProject] = useState(null)

  const accent = currentTheme.accentColor || '#ff4500'
  const glow = currentTheme.accentGlow || 'rgba(255, 69, 0, 0.35)'
  const textMain = currentTheme.textMain || '#f8fafc'
  const textBody = currentTheme.textBody || '#cbd5e1'
  const textMuted = currentTheme.textMuted || '#94a3b8'

  const projects = [
    {
      id: 1,
      title: 'AgriLend Platform',
      role: 'Frontend Developer',
      year: '2026',
      category: 'web',
      description: 'Engineered a modern, responsive web application interface for agricultural financing and resource tracking. Integrated dynamic UI components with backend RESTful APIs.',
      tags: ['React', 'RESTful APIs', 'Tailwind CSS', 'Agile Workflow'],
      gradient: 'from-amber-600 to-orange-600',
      liveUrl: 'https://github.com/EYO-HUB',
      githubUrl: 'https://github.com/EYO-HUB',
      details: {
        problem: 'Agricultural financing needed a streamlined, responsive user platform for managing loan applications and resource distribution.',
        solution: 'Developed dynamic UI components in React, integrated backend RESTful APIs, and ensured cross-browser consistency across mobile and desktop environments.',
        features: [
          'Dynamic loan application workflows and farmer telemetry tracking',
          'RESTful API integration with real-time state management',
          'Responsive cross-device glassmorphic UI interface'
        ]
      }
    },
    {
      id: 2,
      title: 'Library Management System',
      role: 'Lead Developer (Java Swing)',
      year: '2026',
      category: 'desktop',
      description: 'Developed a full-featured desktop management system handling book inventory, user records, and issue tracking using Object-Oriented Programming principles.',
      tags: ['Java', 'Java Swing', 'OOP Architecture', 'Database Systems'],
      gradient: 'from-orange-600 to-amber-600',
      liveUrl: 'https://github.com/EYO-HUB',
      githubUrl: 'https://github.com/EYO-HUB',
      details: {
        problem: 'Paper-based and manual library records resulted in inefficient inventory tracking and book issue management.',
        solution: 'Structured robust backend data persistence and implemented interactive desktop views using Java Swing and OOP principles.',
        features: [
          'Full book inventory management and real-time availability tracking',
          'User record registration, fine calculation, and issue history',
          'Clean Object-Oriented architecture with persistent file/database storage'
        ]
      }
    },
    {
      id: 3,
      title: 'EY Electronics Store',
      role: 'Store Developer & Administrator',
      year: '2026',
      category: 'web',
      description: 'Designed and configured a complete e-commerce storefront with custom product categorization and a seamless checkout flow.',
      tags: ['Web Development', 'E-Commerce UI', 'Tailwind CSS', 'System Design'],
      gradient: 'from-amber-500 to-orange-500',
      liveUrl: 'https://github.com/EYO-HUB',
      githubUrl: 'https://github.com/EYO-HUB',
      details: {
        problem: 'Needed an intuitive online storefront for browsing electronics with customized product filters and checkout processing.',
        solution: 'Configured a responsive storefront UI featuring dynamic product grid filtering and streamlined user navigation.',
        features: [
          'Custom product categorization for tech & electronic hardware',
          'Interactive cart management & seamless checkout process',
          'Fully responsive design optimized for mobile and desktop shoppers'
        ]
      }
    },
    {
      id: 4,
      title: 'Personal Developer Portfolio',
      role: 'Web Developer',
      year: '2025 - 2026',
      category: '3d',
      description: 'Built and launched an interactive spatial 3D portfolio featuring kinetic WebGL shaders, semantic HTML5, and responsive controls.',
      tags: ['React Three Fiber', 'Three.js', 'WebGL', 'Tailwind CSS'],
      gradient: 'from-orange-500 to-amber-500',
      liveUrl: 'https://github.com/EYO-HUB',
      githubUrl: 'https://github.com/EYO-HUB',
      details: {
        problem: 'Standard static resume sites fail to demonstrate modern 3D web engineering capabilities and interactive software craft.',
        solution: 'Created a procedural kinetic 3D iris visualizer integrated with responsive portfolio sections.',
        features: [
          'Real-time WebGL shader rendering with 60FPS hardware acceleration',
          'Custom 3D model controls & interactive wireframe inspector',
          'Fully accessible, responsive spatial web app'
        ]
      }
    }
  ]

  const filteredProjects = activeFilter === 'all'
    ? projects
    : projects.filter(p => p.category === activeFilter)

  return (
    <section id="projects" className="relative py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10">
      
      {/* Background Soft Accent Spot */}
      <div
        className="absolute top-1/3 right-10 w-[500px] h-[300px] blur-3xl rounded-full pointer-events-none -z-10 opacity-20"
        style={{ backgroundColor: accent }}
      />

      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <div
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-md border text-xs font-mono font-semibold uppercase tracking-wider mb-3 shadow-sm"
            style={{
              backgroundColor: `${accent}18`,
              borderColor: `${accent}40`,
              color: accent
            }}
          >
            <Box className="w-3.5 h-3.5" style={{ color: accent }} />
            <span>Eyob Tesfaye Asefa &bull; Projects</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-5xl font-extrabold tracking-tight" style={{ color: textMain }}>
            Featured Software Engineering Work
          </h2>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2 p-1.5 rounded-2xl glass-panel border" style={{ borderColor: `${accent}30` }}>
          {[
            { id: 'all', label: 'All Projects' },
            { id: 'web', label: 'Web Applications' },
            { id: 'desktop', label: 'Desktop (Java)' },
            { id: '3d', label: '3D Spatial' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeFilter === tab.id ? 'text-white shadow-lg' : 'opacity-70 hover:opacity-100 hover:bg-white/10'
              }`}
              style={{
                backgroundColor: activeFilter === tab.id ? accent : 'transparent',
                boxShadow: activeFilter === tab.id ? `0 4px 15px ${glow}` : undefined,
                color: activeFilter === tab.id ? '#ffffff' : textMain
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className="glass-panel glass-panel-interactive overflow-hidden flex flex-col justify-between group border rounded-2xl shadow-xl"
            style={{ borderColor: `${accent}25` }}
          >
            {/* Visual Header Banner */}
            <div className={`h-48 w-full bg-gradient-to-tr ${project.gradient} p-6 relative flex flex-col justify-between overflow-hidden`}>
              <div className="absolute inset-0 bg-black/35 backdrop-blur-[2px]" />
              
              {/* Decorative Mesh Circle */}
              <div className="absolute -right-8 -bottom-8 w-40 h-40 rounded-full bg-white/15 blur-xl group-hover:scale-150 transition-transform duration-500" />

              <div className="relative z-10 flex justify-between items-start">
                <span className="px-3 py-1 rounded-full bg-black/50 backdrop-blur-md border border-white/20 text-xs font-mono text-white font-semibold">
                  {project.tags[0]}
                </span>
                <button
                  onClick={() => setSelectedProject(project)}
                  className="p-2 rounded-full bg-black/40 hover:bg-black/70 text-white transition-colors shadow-sm cursor-pointer"
                  title="Inspect Details"
                >
                  <Eye className="w-4 h-4" />
                </button>
              </div>

              <div className="relative z-10">
                <h3 className="font-heading text-2xl font-bold text-white drop-shadow">
                  {project.title}
                </h3>
              </div>
            </div>

            {/* Content Body */}
            <div className="p-6 flex-1 flex flex-col justify-between">
              <p className="text-sm leading-relaxed mb-6 font-medium" style={{ color: textBody }}>
                {project.description}
              </p>

              <div>
                {/* Tech Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-lg border text-[11px] font-mono font-bold shadow-sm bg-black/20"
                      style={{
                        borderColor: `${accent}30`,
                        color: textMain
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Footer Action Links */}
                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="text-xs font-bold hover:underline flex items-center gap-1 cursor-pointer"
                    style={{ color: accent }}
                  >
                    View Details & Architecture &rarr;
                  </button>

                  <div className="flex items-center gap-3">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg border hover:bg-white/10 transition-colors"
                      style={{
                        borderColor: `${accent}35`,
                        color: accent
                      }}
                      title="GitHub Code"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Project Details Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4">
          <div
            className="glass-panel border p-6 sm:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto relative animate-in fade-in zoom-in-95 rounded-2xl shadow-2xl"
            style={{ borderColor: accent }}
          >
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-white/10 transition-all cursor-pointer"
              style={{ color: textMain }}
            >
              <X className="w-5 h-5" />
            </button>

            <span
              className="px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider font-semibold"
              style={{
                backgroundColor: `${accent}20`,
                color: accent
              }}
            >
              Project Architecture
            </span>

            <h3 className="font-heading text-2xl sm:text-3xl font-bold mt-3 mb-4" style={{ color: textMain }}>
              {selectedProject.title}
            </h3>

            <p className="text-sm mb-6 leading-relaxed" style={{ color: textBody }}>
              {selectedProject.description}
            </p>

            <div className="space-y-4 mb-6">
              <div className="p-4 rounded-xl bg-black/30 border border-white/10">
                <h4 className="text-xs font-mono uppercase tracking-wider mb-1 font-semibold" style={{ color: accent }}>
                  The Challenge
                </h4>
                <p className="text-xs sm:text-sm" style={{ color: textBody }}>{selectedProject.details.problem}</p>
              </div>

              <div className="p-4 rounded-xl bg-black/30 border border-white/10">
                <h4 className="text-xs font-mono uppercase tracking-wider mb-1 font-semibold" style={{ color: accent }}>
                  The Solution
                </h4>
                <p className="text-xs sm:text-sm" style={{ color: textBody }}>{selectedProject.details.solution}</p>
              </div>
            </div>

            <h4 className="font-heading font-semibold text-base mb-3" style={{ color: textMain }}>Key Features:</h4>
            <ul className="space-y-2 mb-8">
              {selectedProject.details.features.map((feat, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm" style={{ color: textBody }}>
                  <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" style={{ color: accent }} />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>

            <div className="flex gap-4">
              <button
                onClick={() => setSelectedProject(null)}
                className="w-full py-3 rounded-xl font-bold text-sm text-white transition-all shadow-md cursor-pointer hover:scale-[1.02]"
                style={{
                  backgroundColor: accent,
                  boxShadow: `0 6px 20px ${glow}`
                }}
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
