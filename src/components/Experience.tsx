import { experience } from "../data/content";
import { Reveal } from "./ui/Reveal";
import { SectionHeader } from "./ui/SectionHeader";

export function Experience() {
  return (
    <section id="experience" className="relative scroll-mt-24 py-20 sm:py-28">
      <div className="shell">
        <SectionHeader
          index="02"
          label="Experience"
          title="Where I've worked."
          note="Internships, campus leadership and community programs — real teams, real deadlines."
        />

        <div className="border-t border-line">
          {experience.map((e, i) => (
            <Reveal key={`${e.company}-${e.role}`} delay={0.03 * i}>
              <div className="group relative grid gap-3 border-b border-line py-7 transition-colors hover:bg-white/[0.018] sm:grid-cols-12 sm:gap-6 sm:py-8">
                <span className="absolute left-0 top-0 h-full w-px scale-y-0 bg-accent transition-transform duration-500 group-hover:scale-y-100" />

                <div className="sm:col-span-3">
                  <div className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-muted">
                    {e.period}
                  </div>
                  <div className="mt-1.5 font-mono text-[10px] text-[#6F7683]">{e.type}</div>
                </div>

                <div className="sm:col-span-4">
                  <h3 className="font-display text-[19px] font-medium leading-tight tracking-tight text-ink sm:text-[21px]">
                    {e.role}
                  </h3>
                  <div className="mt-1 text-[13px] text-accent/90">{e.company}</div>
                </div>

                <p className="max-w-[52ch] text-[13.5px] leading-relaxed text-muted sm:col-span-5">
                  {e.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
