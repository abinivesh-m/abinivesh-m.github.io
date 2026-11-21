import { ArrowUpRight, Github, Play } from "lucide-react";
import { projects } from "../data/content";
import { Reveal } from "./ui/Reveal";
import { SectionHeader } from "./ui/SectionHeader";

const palettes = [
  ["#4C6FFF", "#0A1130"],
  ["#8B5CF6", "#140E2C"],
  ["#22D3EE", "#062029"],
  ["#F97316", "#251106"],
  ["#34D399", "#052018"],
  ["#FACC15", "#221A05"],
  ["#F472B6", "#26081A"],
];

function ProjectVisual({
  index,
  name,
  tagline,
  metric,
}: {
  index: number;
  name: string;
  tagline: string;
  metric: string;
}) {
  const [a, b] = palettes[index % palettes.length];
  return (
    <div className="relative overflow-hidden rounded-[18px] border border-line bg-[#0A0C11]">
      <div
        className="absolute inset-0 opacity-90 transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
        style={{
          background: `radial-gradient(120% 120% at 82% 8%, ${a}44 0%, transparent 55%), radial-gradient(90% 90% at 10% 90%, ${a}22 0%, transparent 60%), linear-gradient(160deg, ${b}, #06070B 78%)`,
        }}
      />
      <div className="absolute inset-0 grid-lines opacity-40" />

      {/* window chrome */}
      <div className="relative flex items-center gap-2 border-b border-white/[0.06] px-4 py-3">
        <span className="h-2 w-2 rounded-full bg-white/15" />
        <span className="h-2 w-2 rounded-full bg-white/15" />
        <span className="h-2 w-2 rounded-full bg-white/15" />
        <span className="ml-2 truncate font-mono text-[10px] tracking-tight text-white/35">
          ~/projects/{name.toLowerCase().replace(/\s+/g, "-")}
        </span>
      </div>

      <div className="relative flex aspect-[16/11] flex-col justify-between p-5">
        <div className="flex items-start justify-between">
          <span
            className="font-mono text-[10px] uppercase tracking-[0.16em]"
            style={{ color: a }}
          >
            shipped
          </span>
          <span className="font-mono text-[10px] text-white/30">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5">
          <div className="max-w-[78%]">
            <div
              className="font-mono text-[10px] uppercase tracking-[0.16em]"
              style={{ color: a }}
            >
              {tagline}
            </div>
            <div className="mt-2.5 font-mono text-[10px] leading-relaxed text-white/40">
              {metric}
            </div>
          </div>
          <div
            className="h-14 w-14 shrink-0 rounded-full opacity-80 blur-xl"
            style={{ background: a }}
          />
        </div>

        <div
          className="pointer-events-none absolute right-4 top-1/2 font-display text-[110px] font-semibold leading-none tracking-tighter text-transparent opacity-[0.07] sm:text-[130px]"
          style={{ WebkitTextStroke: "1px rgba(255,255,255,0.9)" }}
        >
          {String(index + 1).padStart(2, "0")}
        </div>
      </div>
    </div>
  );
}

export function Work() {
  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  return (
    <section id="work" className="relative scroll-mt-24 py-20 sm:py-28">
      <div className="shell">
        <SectionHeader
          index="01"
          label="Selected work"
          title="Things I've shipped."
          note="Every project below is live or public — built end-to-end, judged by users and hackathon panels, not by how the code looks on GitHub."
        />

        <div className="border-t border-line">
          {featured.map((p, i) => (
            <Reveal key={p.id} delay={0.03 * i}>
              <article className="group relative border-b border-line py-9 sm:py-11">
                <div className="grid gap-8 lg:grid-cols-12 lg:items-center lg:gap-10">
                  <div className="lg:col-span-6 xl:col-span-7">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-[10.5px] text-muted">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="h-px w-8 bg-line" />
                      <span className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-muted">
                        {p.tagline}
                      </span>
                    </div>

                    <h3 className="mt-4 font-display text-[30px] font-medium leading-none tracking-tight text-ink transition-transform duration-500 group-hover:translate-x-1 sm:text-[38px]">
                      {p.name}
                    </h3>

                    <p className="mt-4 max-w-[58ch] text-[14.5px] leading-relaxed text-muted">
                      {p.description}
                    </p>

                    <div className="mt-5 flex flex-wrap gap-1.5">
                      {p.tech.map((t) => (
                        <span key={t} className="chip">
                          {t}
                        </span>
                      ))}
                    </div>

                    <div className="mt-6 flex flex-wrap items-center gap-4">
                      {p.live ? (
                        <a
                          href={p.live}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 text-[13px] text-ink transition-colors hover:text-accent"
                        >
                          <Play className="h-3.5 w-3.5" />
                          <span className="link-underline">Live</span>
                        </a>
                      ) : null}
                      {p.github ? (
                        <a
                          href={p.github}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 text-[13px] text-muted transition-colors hover:text-ink"
                        >
                          <Github className="h-3.5 w-3.5" />
                          <span className="link-underline">Source</span>
                        </a>
                      ) : null}
                      <span className="font-mono text-[10.5px] leading-relaxed text-[#6F7683]">
                        {p.impact}
                      </span>
                    </div>
                  </div>

                  <div className="lg:col-span-6 xl:col-span-5">
                    <ProjectVisual index={i} name={p.name} tagline={p.tagline} metric={p.impact} />
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="border-b border-line">
            {rest.map((p) => (
              <a
                key={p.id}
                href={p.live || p.github}
                target="_blank"
                rel="noreferrer"
                className="group grid grid-cols-12 items-center gap-4 border-t border-line py-5 transition-colors hover:bg-white/[0.02]"
              >
                <div className="col-span-12 sm:col-span-4">
                  <div className="font-display text-[17px] font-medium tracking-tight text-ink">
                    {p.name}
                  </div>
                  <div className="mt-0.5 font-mono text-[10.5px] text-muted">{p.tagline}</div>
                </div>
                <p className="col-span-12 hidden max-w-[52ch] text-[13px] leading-relaxed text-muted sm:col-span-6 sm:block">
                  {p.description}
                </p>
                <div className="col-span-12 flex items-center justify-between sm:col-span-2 sm:justify-end">
                  <span className="font-mono text-[10px] text-[#6F7683] sm:hidden">
                    {p.tech.slice(0, 3).join(" · ")}
                  </span>
                  <ArrowUpRight className="h-4 w-4 text-muted transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
                </div>
              </a>
            ))}
          </div>
        </Reveal>

        <Reveal>
          <div className="mt-10 flex justify-center">
            <a
              href="https://github.com/abinivesh-m?tab=repositories"
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-2 rounded-full border border-line px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.14em] text-muted transition-colors hover:border-accent/40 hover:text-ink"
            >
              All repositories
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
