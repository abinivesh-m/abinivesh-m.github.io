'use client'

import dynamic from 'next/dynamic'
import { Github, Linkedin, Mail, FileText } from 'lucide-react'
import { achievements, experience, leetcode, projects, skills, stats } from '@/lib/content'
import { NavBar } from '@/components/ui/NavBar'

const Scene = dynamic(() => import('@/components/3d/Scene'), {
  ssr: false,
  loading: () => (
    <div className="fixed inset-0 z-0 flex items-center justify-center bg-navy">
      <div className="h-12 w-12 animate-spin rounded-full border-2 border-accent border-t-transparent" />
    </div>
  ),
})

export default function Home() {
  return (
    <main className="relative min-h-screen bg-navy overflow-y-auto">
      <NavBar />
      <Scene />

      <section id="about" className="section-shell relative z-10">
        <div className="max-w-4xl glass rounded-3xl p-8 md:p-12">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-accent">
            About
          </p>
          <h2 className="mb-6 text-4xl font-black tracking-tight text-white md:text-6xl">
            I build AI products that ship.
          </h2>
          <p className="text-lg leading-8 text-slate-200">
            I am a 2nd-year ECE student at SKCET, Coimbatore. I have shipped 7 products end-to-end with
            Flutter, FastAPI, LLMs, and AWS — from scam detection to multi-agent career guidance and
            ANPR vehicle tracking. 3× Hackathon Winner. 2× IIT Finalist. HackerRank Campus Crew.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <Stat key={stat.label} label={stat.label} value={stat.value} sub={stat.sub} />
            ))}
          </div>
        </div>
      </section>

      <section id="work" className="section-shell relative z-10">
        <div className="max-w-7xl glass rounded-3xl p-8 md:p-12">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-accent">
            Work
          </p>
          <h2 className="mb-10 text-4xl font-black tracking-tight text-white md:text-6xl">
            Selected Projects
          </h2>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </section>

      <section id="experience" className="section-shell relative z-10">
        <div className="max-w-7xl glass rounded-3xl p-8 md:p-12">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-accent">
                Experience
              </p>
              <h2 className="mb-8 text-4xl font-black tracking-tight text-white md:text-5xl">
                Building in public
              </h2>
              <div className="space-y-6">
                {experience.map((item) => (
                  <div key={item.role} className="rounded-2xl border border-slate-700 bg-slate-900/60 p-5">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <h3 className="text-xl font-bold text-white">{item.role}</h3>
                      <span className="text-sm text-slate-300">{item.period}</span>
                    </div>
                    <p className="mt-1 text-sm font-medium text-accent">
                      {item.company} · {item.type}
                    </p>
                    <p className="mt-3 text-slate-200">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-accent">
                Skills
              </p>
              <h2 className="mb-8 text-4xl font-black tracking-tight text-white md:text-5xl">
                Stack
              </h2>
              <div className="space-y-6">
                {Object.entries(skills).map(([group, items]) => (
                  <div key={group}>
                    <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
                      {group}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {items.map((skill) => (
                        <span
                          key={skill}
                          className="rounded-full border border-slate-700 bg-slate-900/60 px-3 py-1.5 text-sm font-medium text-slate-100"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="achievements" className="section-shell relative z-10">
        <div className="max-w-5xl glass rounded-3xl p-8 md:p-12">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-accent">
            Achievements
          </p>
          <h2 className="mb-8 text-4xl font-black tracking-tight text-white md:text-5xl">
            Proof of execution
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            {achievements.map((achievement) => (
              <div
                key={achievement}
                className="rounded-2xl border border-slate-700 bg-slate-900/60 p-4 text-slate-200"
              >
                {achievement}
              </div>
            ))}
          </div>
          <div className="mt-8 rounded-2xl border border-slate-700 bg-slate-900/60 p-5">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
              LeetCode
            </p>
            <p className="mt-2 text-slate-200">
              {leetcode.solved} solved · {leetcode.easy} Easy · {leetcode.medium} Medium · {leetcode.hard} Hard ·{' '}
              {leetcode.acceptance} acceptance · Rating {leetcode.rating} (beats {leetcode.beats})
            </p>
            <a
              href={leetcode.url}
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-block text-sm font-semibold text-accent hover:text-blue-400"
            >
              View LeetCode profile →
            </a>
          </div>
        </div>
      </section>

      <section id="contact" className="section-shell relative z-10">
        <div className="max-w-3xl glass rounded-3xl p-8 md:p-12 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-accent">
            Contact
          </p>
          <h2 className="mb-6 text-4xl font-black tracking-tight text-white md:text-6xl">
            Let's build something.
          </h2>
          <p className="mb-8 text-lg text-slate-200">
            Open to SDE and AI engineering roles. Based in Namakkal, Tamil Nadu.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="mailto:abinivesh.1203@gmail.com"
              className="inline-flex items-center gap-2 rounded-xl bg-accent px-6 py-3 font-semibold text-white transition hover:bg-blue-600"
            >
              <Mail size={18} />
              Email Me
            </a>
            <a
              href="/resume.pdf"
              download
              className="inline-flex items-center gap-2 rounded-xl border border-slate-500 px-6 py-3 font-semibold text-slate-100 transition hover:bg-slate-800"
            >
              <FileText size={18} />
              Download Resume
            </a>
            <a
              href="https://github.com/abinivesh-m"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-500 px-6 py-3 font-semibold text-slate-100 transition hover:bg-slate-800"
            >
              <Github size={18} />
              GitHub
            </a>
            <a
              href="https://linkedin.com/in/abinivesh-m-883052380"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-500 px-6 py-3 font-semibold text-slate-100 transition hover:bg-slate-800"
            >
              <Linkedin size={18} />
              LinkedIn
            </a>
          </div>
        </div>
      </section>

      <footer className="relative z-10 border-t border-slate-800 px-6 py-8 text-center text-sm text-slate-400">
        © {new Date().getFullYear()} Abinivesh M. Built with Next.js, React Three Fiber, and Tailwind CSS.
      </footer>
    </main>
  )
}

function Stat({ label, value, sub }: { label: string; value: string; sub: string }) {
  return (
    <div className="rounded-2xl border border-slate-700 bg-slate-900/60 p-4">
      <p className="text-2xl font-black text-white">{value}</p>
      <p className="text-sm font-medium text-slate-200">{label}</p>
      <p className="mt-1 text-xs text-slate-400">{sub}</p>
    </div>
  )
}

function ProjectCard({ project }: { project: (typeof projects)[number] }) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-slate-700 bg-slate-900/70 transition hover:-translate-y-1 hover:border-accent/50">
      <div className="aspect-video overflow-hidden bg-slate-800">
        <img
          src={project.image}
          alt={project.name}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
      </div>
      <div className="p-5">
        <div className="mb-3 flex items-center justify-between gap-3">
          <h3 className="text-xl font-bold text-white">{project.name}</h3>
          <span className="rounded-full bg-accent/15 px-3 py-1 text-xs font-semibold text-accent">
            {project.impact}
          </span>
        </div>
        <p className="text-sm text-slate-200">{project.description}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {project.tech.map((tag) => (
            <span key={tag} className="rounded-full border border-slate-700 px-3 py-1 text-xs text-slate-300">
              {tag}
            </span>
          ))}
        </div>
        <div className="mt-5 flex flex-wrap gap-3">
          {'live' in project && project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noreferrer"
              className="text-sm font-semibold text-accent hover:text-blue-400"
            >
              Live →
            </a>
          )}
          <a
            href={project.github}
            target="_blank"
            rel="noreferrer"
            className="text-sm font-semibold text-slate-300 hover:text-white"
          >
            GitHub →
          </a>
        </div>
      </div>
    </article>
  )
}