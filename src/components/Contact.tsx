import { useState } from "react";
import { ArrowUpRight, Check, Copy, Github, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import { hero } from "../data/content";
import { Reveal } from "./ui/Reveal";

const socials = [
  { icon: Github, label: "GitHub", value: "github.com/abinivesh-m", href: hero.github },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "in/abinivesh-m-883052380",
    href: hero.linkedin,
  },
  { icon: Mail, label: "Email", value: hero.email, href: `mailto:${hero.email}` },
  { icon: Phone, label: "Phone", value: hero.phone, href: `tel:${hero.phone.replace(/\s/g, "")}` },
];

export function Contact() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(hero.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${hero.email}`;
    }
  };

  return (
    <section id="contact" className="relative scroll-mt-24 overflow-hidden pb-14 pt-20 sm:pt-28">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-line to-transparent" />
      <div className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[820px] -translate-x-1/2 bg-[radial-gradient(ellipse_at_center,rgba(110,139,255,0.16),transparent_62%)]" />

      <div className="shell relative">
        <Reveal>
          <p className="label">06 — Contact</p>
        </Reveal>

        <Reveal delay={0.05}>
          <h2 className="mt-6 max-w-[16ch] display text-[clamp(38px,7vw,76px)]">
            Let&apos;s build something{" "}
            <span className="text-gradient">worth shipping</span>.
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mt-6 max-w-[52ch] text-[14.5px] leading-relaxed text-muted">
            I&apos;m looking for SDE / AI engineering internships where I can own real surface area.
            If you&apos;re building something ambitious, my inbox is open.
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <a
              href={`mailto:${hero.email}`}
              className="group inline-flex items-center gap-2.5 rounded-full bg-ink px-5 py-3 text-[13.5px] font-medium text-[#07080A] transition-transform duration-300 hover:-translate-y-0.5"
            >
              <Mail className="h-4 w-4" />
              {hero.email}
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>

            <button
              onClick={copy}
              className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-3 text-[13px] text-muted transition-colors hover:border-accent/40 hover:text-ink"
            >
              {copied ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
              {copied ? "Copied" : "Copy"}
            </button>
          </div>
        </Reveal>

        <div className="mt-16 grid gap-x-10 gap-y-1 border-t border-line pt-8 sm:grid-cols-2">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target={s.href.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
              className="group flex items-center justify-between border-b border-line py-4 transition-colors hover:border-accent/30"
            >
              <span className="flex items-center gap-3">
                <s.icon className="h-4 w-4 text-muted transition-colors group-hover:text-accent" />
                <span className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-muted">
                  {s.label}
                </span>
              </span>
              <span className="flex items-center gap-2 text-[13px] text-ink/85">
                {s.value}
                <ArrowUpRight className="h-3.5 w-3.5 text-muted transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
              </span>
            </a>
          ))}
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-line pt-7 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[10.5px] uppercase tracking-[0.12em] text-[#5F6672]">
            <span className="flex items-center gap-1.5">
              <MapPin className="h-3 w-3" /> {hero.location}
            </span>
            <span>© {new Date().getFullYear()} Abinivesh M</span>
          </div>
          <div className="flex items-center gap-5 font-mono text-[10.5px] uppercase tracking-[0.12em] text-[#5F6672]">
            <a href="/resume.html" target="_blank" rel="noreferrer" className="hover:text-ink">
              Résumé
            </a>
            <a href="#top" className="hover:text-ink">
              Back to top
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
