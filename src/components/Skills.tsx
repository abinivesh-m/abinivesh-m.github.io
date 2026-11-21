import { certifications, skills } from "../data/content";
import { Reveal, RevealStagger, StaggerItem } from "./ui/Reveal";
import { SectionHeader } from "./ui/SectionHeader";

const groups = [
  { key: "languages", label: "Languages", items: skills.languages },
  { key: "backend", label: "Backend & data", items: skills.backend },
  { key: "ai", label: "AI / ML & agents", items: skills.ai },
  { key: "devops", label: "Cloud, DevOps & tooling", items: [...skills.devops, ...skills.mobile] },
] as const;

export function Skills() {
  return (
    <section id="skills" className="relative scroll-mt-24 py-20 sm:py-28">
      <div className="shell">
        <SectionHeader
          index="04"
          label="Capabilities"
          title="What I build with."
          note="The stack I reach for when a weekend idea has to become a production service by Monday."
        />

        <RevealStagger className="grid gap-x-12 gap-y-10 sm:grid-cols-2">
          {groups.map((g) => (
            <StaggerItem key={g.key}>
              <div>
                <div className="flex items-center gap-3">
                  <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink/80">
                    {g.label}
                  </span>
                  <span className="h-px flex-1 bg-line" />
                  <span className="font-mono text-[10px] text-[#5F6672]">
                    {String(g.items.length).padStart(2, "0")}
                  </span>
                </div>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {g.items.map((item) => (
                    <span key={item} className="chip">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </StaggerItem>
          ))}
        </RevealStagger>

        <Reveal>
          <div className="panel mt-14 p-6 sm:p-8">
            <div className="flex items-center gap-3">
              <span className="label">Certifications</span>
              <span className="h-px flex-1 bg-line" />
              <span className="font-mono text-[10px] text-[#5F6672]">
                {certifications.length}
              </span>
            </div>
            <div className="mt-5 grid gap-x-8 gap-y-3 sm:grid-cols-2">
              {certifications.map((c) => (
                <div key={c} className="flex items-start gap-2.5">
                  <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-accent/60" />
                  <span className="text-[12.5px] leading-relaxed text-muted">{c}</span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
