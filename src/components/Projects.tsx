import { motion } from "framer-motion"
import { ExternalLink, Github } from "lucide-react"
import { projects } from "../data/content"

interface ProjectCardProps {
  p: typeof projects[0]
  compact?: boolean
}

export const ProjectCard = ({ p, compact = false }: ProjectCardProps) => {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      className={`card-premium group`}
    >
      <div className="flex justify-between items-start mb-4">
        <h3 className={`font-bold text-white group-hover:text-sky-400 transition-colors ${compact ? "text-lg" : "text-xl"}`}>
          {p.name}
        </h3>
        <ExternalLink className="w-5 h-5 text-slate-500 group-hover:text-sky-400 transition-colors" />
      </div>
      <p className="text-sm text-sky-500 font-semibold mb-2 uppercase tracking-wider">{p.tagline}</p>
      <p className="text-sm text-slate-400 mb-4 line-clamp-3">{p.description}</p>
      <div className="flex flex-wrap gap-2 mb-4">
        {p.tech.map((t) => (
          <span key={t} className="skill-badge">{t}</span>
        ))}
      </div>
      <div className="flex gap-3 pt-4 border-t border-white/10">
        {p.live && (
          <a
            href={p.live}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 btn-accent text-sm text-center"
          >
            Live Demo
          </a>
        )}
        <a
          href={p.github}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 btn-glass text-sm text-center"
        >
          <Github className="w-4 h-4 mr-2" /> Source
        </a>
      </div>
      {p.impact && (
        <p className="mt-4 text-xs text-slate-500 italic">{p.impact}</p>
      )}
    </motion.div>
  )
}

export const FeaturedProjects = () => {
  const featured = projects.filter((p) => p.featured)
  const additional = projects.filter((p) => !p.featured)

  return (
    <section id="work" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center gap-2 mb-8">
          <div className="w-1 h-8 bg-sky-500 rounded-full"></div>
          <h2 className="text-3xl font-bold text-white">Featured Work</h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {featured.map((p) => (
            <ProjectCard key={p.id} p={p} />
          ))}
        </div>
        <h3 className="text-xl font-semibold text-slate-300 mb-6">More Projects</h3>
        <div className="grid md:grid-cols-2 gap-6">
          {additional.map((p) => (
            <ProjectCard key={p.id} p={p} compact />
          ))}
        </div>
      </div>
    </section>
  )
}
