import { useRef } from "react";
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { ArrowDownRight, ArrowUpRight, Github, Linkedin, Mail } from "lucide-react";
import { hero } from "../data/content";
import { EASE } from "./ui/Reveal";

const quickStats = [
  { value: "113", label: "LeetCode solved" },
  { value: "3×", label: "Hackathon wins" },
  { value: "2×", label: "IIT finals" },
  { value: "9.1", label: "CGPA / 10" },
];

const floatChips = [
  { text: "FastAPI", className: "left-[-18px] top-[18%] float-a" },
  { text: "Gemini", className: "right-[-26px] top-[34%] float-b" },
  { text: "Flutter", className: "left-[2%] bottom-[16%] float-c" },
  { text: "AWS", className: "right-[0%] bottom-[8%] float-a" },
];

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const portraitY = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const fade = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const sx = useSpring(tiltX, { stiffness: 120, damping: 18 });
  const sy = useSpring(tiltY, { stiffness: 120, damping: 18 });

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    tiltY.set(px * 12);
    tiltX.set(py * -10);
  };
  const onLeave = () => {
    tiltX.set(0);
    tiltY.set(0);
  };

  const words = hero.name.split(" ");

  return (
    <section
      id="top"
      ref={ref}
      className="relative overflow-hidden pb-16 pt-[112px] sm:pb-24 sm:pt-[136px]"
    >
      <div className="pointer-events-none absolute inset-0 grid-lines opacity-70" />
      <div className="pointer-events-none absolute -left-[10%] -top-[10%] h-[520px] w-[520px] glow-blue opacity-60 blur-[10px]" />
      <div className="pointer-events-none absolute -right-[8%] top-[6%] h-[440px] w-[440px] rounded-full bg-[radial-gradient(circle_at_center,rgba(167,139,250,0.22),transparent_62%)] blur-[6px]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#07080A] to-transparent" />

      <div className="shell relative">
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-10">
          {/* ---------------- left ---------------- */}
          <div className="lg:col-span-7">
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE }}
              className="inline-flex items-center gap-2.5 rounded-full border border-line bg-white/[0.03] px-3.5 py-1.5"
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
              </span>
              <span className="font-mono text-[9.5px] uppercase tracking-[0.14em] text-muted sm:text-[10.5px] sm:tracking-[0.16em]">
                Open to SDE / AI roles · 2027
              </span>
            </motion.div>

            <h1 className="mt-7 display text-[clamp(46px,8.4vw,96px)]">
              {words.map((word, i) => (
                <motion.span
                  key={word}
                  initial={reduce ? false : { opacity: 0, y: 34, filter: "blur(6px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ duration: 0.95, delay: 0.08 + i * 0.1, ease: EASE }}
                  className="inline-block"
                >
                  {i === 0 ? (
                    <span className="text-gradient">{word}</span>
                  ) : (
                    <span className="text-ink">
                      {word}
                      <span className="text-accent">.</span>
                    </span>
                  )}
                  {i === 0 ? <span>&nbsp;</span> : null}
                </motion.span>
              ))}
            </h1>

            <motion.p
              initial={reduce ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.34, ease: EASE }}
              className="mt-5 max-w-[30ch] text-[21px] font-medium leading-[1.28] tracking-tight text-[#C9CDD6] sm:text-[25px]"
            >
              I build AI products that{" "}
              <span className="border-b border-accent/40 pb-0.5 text-ink">actually ship</span>.
            </motion.p>

            <motion.p
              initial={reduce ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.42, ease: EASE }}
              className="mt-6 max-w-[52ch] text-[15px] leading-relaxed text-muted"
            >
              {hero.intro}
            </motion.p>

            <motion.div
              initial={reduce ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease: EASE }}
              className="mt-9 flex flex-wrap items-center gap-3"
            >
              <a
                href="#work"
                className="group inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-[13.5px] font-medium text-[#07080A] transition-transform duration-300 hover:-translate-y-0.5"
              >
                Selected work
                <ArrowDownRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5 group-hover:translate-x-0.5" />
              </a>

              <a
                href="/resume.html"
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-2 rounded-full border border-line px-5 py-3 text-[13.5px] text-ink transition-colors hover:border-accent/50 hover:bg-accent/[0.08]"
              >
                Résumé
                <ArrowUpRight className="h-4 w-4 text-muted transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
              </a>

              <div className="ml-1 flex items-center gap-1">
                {[
                  { icon: Github, href: hero.github, label: "GitHub" },
                  { icon: Linkedin, href: hero.linkedin, label: "LinkedIn" },
                  { icon: Mail, href: `mailto:${hero.email}`, label: "Email" },
                ].map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel="noreferrer"
                    aria-label={label}
                    className="grid h-10 w-10 place-items-center rounded-full text-muted transition-colors hover:bg-white/[0.04] hover:text-ink"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.7 }}
              className="mt-12 grid max-w-[520px] grid-cols-2 gap-x-6 gap-y-5 border-t border-line pt-7 sm:grid-cols-4"
            >
              {quickStats.map((s) => (
                <div key={s.label}>
                  <div className="font-display text-[26px] font-medium tracking-tight text-ink">
                    {s.value}
                  </div>
                  <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.12em] text-muted">
                    {s.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ---------------- right ---------------- */}
          <motion.div
            style={{ y: portraitY, opacity: fade }}
            className="relative lg:col-span-5"
          >
            <div
              onMouseMove={onMove}
              onMouseLeave={onLeave}
              className="relative mx-auto flex max-w-[440px] flex-col items-center justify-center py-6"
              style={{ perspective: 900 }}
            >
              <div className="pointer-events-none absolute inset-0 glow-blue blur-2xl" />

              <motion.div
                style={{ rotateX: sx, rotateY: sy, transformStyle: "preserve-3d" }}
                initial={reduce ? false : { opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.1, delay: 0.2, ease: EASE }}
                className="relative"
              >
                {/* rotating conic ring */}
                <div className="spin-slow absolute -inset-[10px] rounded-full bg-[conic-gradient(from_0deg,rgba(110,139,255,0.85),rgba(167,139,250,0.5),rgba(110,139,255,0)_40%,rgba(110,139,255,0.85))] blur-[1px]" />
                <div className="absolute -inset-[6px] rounded-full bg-[#07080A]" />

                <div className="relative h-[276px] w-[276px] overflow-hidden rounded-full border border-white/10 sm:h-[340px] sm:w-[340px]">
                  <img
                    src="/profile.jpg"
                    alt="Abinivesh M"
                    className="h-full w-full object-cover object-center"
                    loading="eager"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#07080A]/55 via-transparent to-transparent" />
                </div>

                {/* floating chips */}
                {floatChips.map((chip) => (
                  <span
                    key={chip.text}
                    className={`absolute ${chip.className} hidden rounded-full border border-line bg-[#0B0D12]/85 px-3 py-1.5 font-mono text-[10.5px] tracking-tight text-[#C7CBD4] shadow-[0_8px_30px_rgba(0,0,0,0.5)] backdrop-blur sm:block`}
                    style={{ transform: "translateZ(40px)" }}
                  >
                    {chip.text}
                  </span>
                ))}
              </motion.div>

              <div className="mt-9 rounded-full border border-line bg-[#0B0D12]/70 px-4 py-2 backdrop-blur">
                <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
                  ECE @ SKCET · Coimbatore
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
