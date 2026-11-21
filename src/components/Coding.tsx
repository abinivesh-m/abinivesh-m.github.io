import { motion } from "framer-motion";
import { ArrowUpRight, Gauge, Target, Flame } from "lucide-react";
import { leetcode } from "../data/content";
import { Reveal } from "./ui/Reveal";
import { SectionHeader } from "./ui/SectionHeader";

const tiers = [
  { label: "Easy", solved: leetcode.easy, total: 875, color: "#34D399" },
  { label: "Medium", solved: leetcode.medium, total: 1858, color: "#FBBF24" },
  { label: "Hard", solved: leetcode.hard, total: 842, color: "#F87171" },
];

const maxSolved = Math.max(...tiers.map((t) => t.solved));

export function Coding() {
  return (
    <section className="relative py-20 sm:py-28">
      <div className="shell">
        <SectionHeader
          index="05"
          label="Problem solving"
          title="Consistency, measured."
          note="Live stats from LeetCode — the habit that keeps the fundamentals sharp between product builds."
        />

        <div className="grid gap-4 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <div className="panel h-full p-6 sm:p-8">
              <div className="flex items-end justify-between">
                <div>
                  <div className="font-display text-[56px] font-medium leading-none tracking-tighter text-ink sm:text-[68px]">
                    {leetcode.solved}
                  </div>
                  <div className="mt-2 font-mono text-[10.5px] uppercase tracking-[0.14em] text-muted">
                    problems solved
                  </div>
                </div>
                <a
                  href={leetcode.url}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center gap-1.5 font-mono text-[10.5px] uppercase tracking-[0.12em] text-muted transition-colors hover:text-ink"
                >
                  profile
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              </div>

              <div className="mt-8 space-y-4">
                {tiers.map((t, i) => (
                  <div key={t.label}>
                    <div className="flex items-baseline justify-between">
                      <span className="text-[12.5px] text-muted">{t.label}</span>
                      <span className="font-mono text-[11.5px] text-ink">
                        {t.solved}
                        <span className="text-[#5F6672]"> / {t.total}</span>
                      </span>
                    </div>
                    <div className="mt-2 h-[5px] w-full overflow-hidden rounded-full bg-white/[0.05]">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${(t.solved / maxSolved) * 100}%` }}
                        viewport={{ once: true, margin: "-60px" }}
                        transition={{
                          duration: 1.1,
                          delay: 0.1 + i * 0.12,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        className="h-full rounded-full"
                        style={{ background: t.color }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <div className="grid gap-4 sm:grid-cols-3 lg:col-span-5 lg:grid-cols-1">
            {[
              {
                icon: Target,
                value: leetcode.acceptance,
                label: "Acceptance rate",
                sub: "across all submissions",
              },
              {
                icon: Gauge,
                value: String(leetcode.rating),
                label: "Contest rating",
                sub: `beats ${leetcode.beats} of users`,
              },
              {
                icon: Flame,
                value: "15",
                label: "Hard problems",
                sub: "graphs · DP · intervals",
              },
            ].map((s, i) => (
              <Reveal key={s.label} className="h-full" delay={0.05 * i}>
                <div className="group flex h-full items-center gap-4 rounded-2xl border border-line bg-white/[0.015] p-5 transition-colors hover:border-accent/30">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-line bg-white/[0.03] text-muted transition-colors group-hover:text-accent">
                    <s.icon className="h-4 w-4" />
                  </span>
                  <div>
                    <div className="font-display text-[24px] font-medium leading-none tracking-tight text-ink">
                      {s.value}
                    </div>
                    <div className="mt-1.5 text-[12px] text-ink/80">{s.label}</div>
                    <div className="font-mono text-[10px] text-[#5F6672]">{s.sub}</div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
