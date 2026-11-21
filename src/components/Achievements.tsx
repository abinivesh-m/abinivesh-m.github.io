import { Globe2, TrendingUp, Flag, Cloud, Cpu, Code2, Trophy } from "lucide-react";
import { achievements } from "../data/content";
import { Reveal, RevealStagger, StaggerItem } from "./ui/Reveal";
import { SectionHeader } from "./ui/SectionHeader";

const icons = [Globe2, TrendingUp, Flag, Cloud, Cpu, Code2];

export function Achievements() {
  const [first, ...others] = achievements;
  const firstTitle = first.replace("1st place — ", "").replace(" (₹20,000)", "");

  return (
    <section id="achievements" className="relative scroll-mt-24 py-20 sm:py-28">
      <div className="shell">
        <SectionHeader
          index="03"
          label="Recognition"
          title="Judged, ranked, awarded."
          note="National hackathons across IIT Madras, IIT Kharagpur and SIH — competing against thousands of teams."
        />

        <Reveal>
          <div className="panel group relative overflow-hidden p-6 sm:p-9">
            <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-[radial-gradient(circle_at_center,rgba(110,139,255,0.28),transparent_65%)]" />
            <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-4">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl border border-accent/25 bg-accent/[0.08] text-accent">
                  <Trophy className="h-5 w-5" />
                </span>
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent">
                    Winner · ₹20,000
                  </div>
                  <h3 className="mt-2 font-display text-[24px] font-medium leading-tight tracking-tight text-ink sm:text-[30px]">
                    {firstTitle}
                  </h3>
                  <p className="mt-2 max-w-[52ch] text-[13px] leading-relaxed text-muted">
                    Built a 6-agent LLM career platform in a timed national build-off — profile
                    analysis, skill-gap graph, and a deterministic readiness score.
                  </p>
                </div>
              </div>
              <div className="shrink-0 font-display text-[56px] font-semibold leading-none tracking-tighter text-white/[0.06] sm:text-[76px]">
                01
              </div>
            </div>
          </div>
        </Reveal>

        <RevealStagger className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {others.map((item, i) => {
            const Icon = icons[i % icons.length];
            const [title, detail] = item.split(" — ");
            return (
              <StaggerItem key={item}>
                <div className="group h-full rounded-2xl border border-line bg-white/[0.015] p-5 transition-colors duration-300 hover:border-accent/30 hover:bg-white/[0.03]">
                  <div className="flex items-start justify-between">
                    <Icon className="h-4 w-4 text-muted transition-colors group-hover:text-accent" />
                    <span className="font-mono text-[10px] text-[#5F6672]">
                      {String(i + 2).padStart(2, "0")}
                    </span>
                  </div>
                  <div className="mt-4 font-mono text-[9.5px] uppercase tracking-[0.14em] text-muted">
                    {title}
                  </div>
                  {detail ? (
                    <div className="mt-2 text-[13.5px] font-medium leading-snug text-ink/90">
                      {detail}
                    </div>
                  ) : null}
                </div>
              </StaggerItem>
            );
          })}
        </RevealStagger>
      </div>
    </section>
  );
}
