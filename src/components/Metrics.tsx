import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { Reveal } from "./ui/Reveal";

type Metric = {
  value: number;
  decimals?: number;
  suffix?: string;
  prefix?: string;
  label: string;
  sub: string;
};

const metrics: Metric[] = [
  { value: 113, label: "LeetCode problems", sub: "39 easy · 59 medium · 15 hard" },
  { value: 3, suffix: "×", label: "Hackathon wins", sub: "PromptWars, FlowZint, Product Space" },
  { value: 2, suffix: "×", label: "IIT finals", sub: "BIMSTEC @ IITM · ChurnZero @ IITKGP" },
  { value: 9.1, decimals: 1, label: "CGPA", sub: "B.E. ECE · SKCET · 4th semester" },
];

function Counter({ metric }: { metric: Metric }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (reduce) {
      setDisplay(metric.value);
      return;
    }
    if (!inView) return;
    let raf = 0;
    const start = performance.now();
    const duration = 1500;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(metric.value * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, metric.value, reduce]);

  const shown =
    metric.decimals != null ? display.toFixed(metric.decimals) : Math.round(display).toString();

  return (
    <span ref={ref} className="font-display text-[40px] font-medium tracking-tight text-ink sm:text-[52px]">
      {metric.prefix}
      {shown}
      <span className="text-accent">{metric.suffix}</span>
    </span>
  );
}

export function Metrics() {
  return (
    <section className="relative py-16 sm:py-20">
      <div className="shell">
        <Reveal>
          <div className="panel grid grid-cols-2 overflow-hidden lg:grid-cols-4">
            {metrics.map((m, i) => (
              <div
                key={m.label}
                className={[
                  "relative px-6 py-8 sm:px-8",
                  i % 2 === 1 ? "border-l border-line" : "",
                  i >= 2 ? "border-t border-line" : "",
                  "lg:border-t-0",
                  i >= 1 ? "lg:border-l lg:border-line" : "",
                ].join(" ")}
              >
                <Counter metric={m} />
                <div className="mt-3 text-[13px] font-medium text-ink/90">{m.label}</div>
                <div className="mt-1 font-mono text-[10.5px] leading-relaxed text-muted">
                  {m.sub}
                </div>
                <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent opacity-0 transition-opacity duration-500 hover:opacity-100" />
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
