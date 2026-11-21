import { Reveal } from "./Reveal";

export function SectionHeader({
  index,
  label,
  title,
  note,
}: {
  index: string;
  label: string;
  title: string;
  note?: string;
}) {
  return (
    <div className="mb-12 sm:mb-16">
      <Reveal>
        <div className="flex items-baseline gap-4">
          <span className="label text-accent/80">{index}</span>
          <span className="label">{label}</span>
          <span className="hidden h-px flex-1 bg-line sm:block" />
        </div>
      </Reveal>

      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <Reveal delay={0.05}>
          <h2 className="display text-[34px] leading-[0.95] sm:text-[46px] lg:text-[54px]">
            {title}
          </h2>
        </Reveal>
        {note ? (
          <Reveal delay={0.12}>
            <p className="max-w-[300px] font-mono text-[11px] leading-relaxed text-muted">
              {note}
            </p>
          </Reveal>
        ) : null}
      </div>
    </div>
  );
}
