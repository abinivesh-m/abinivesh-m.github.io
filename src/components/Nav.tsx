import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { navLinks } from "../data/content";

const sections = ["work", "experience", "achievements", "skills", "contact"];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 26, mass: 0.3 });

  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        setScrolled(window.scrollY > 24);
        const y = window.scrollY + window.innerHeight * 0.32;
        let current = "";
        if (window.scrollY > 160) {
          current = sections[0];
          for (const id of sections) {
            const el = document.getElementById(id);
            if (el && el.offsetTop <= y) current = id;
          }
        }
        setActive(current);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <motion.div
        style={{ scaleX: progress }}
        className="fixed inset-x-0 top-0 z-[70] h-[2px] origin-left bg-gradient-to-r from-accent via-[#8FA6FF] to-violet"
      />

      <header className="fixed inset-x-0 top-0 z-50">
        <div
          className={`transition-all duration-500 ${
            scrolled
              ? "border-b border-line bg-[#07080A]/72 backdrop-blur-xl"
              : "border-b border-transparent bg-transparent"
          }`}
        >
          <div className="shell flex h-[68px] items-center justify-between gap-4">
            <a href="#top" className="group flex items-center gap-3" aria-label="Home">
              <span className="grid h-9 w-9 place-items-center rounded-[11px] border border-line bg-white/[0.03] font-display text-[15px] font-semibold tracking-tight transition-colors group-hover:border-accent/50 group-hover:text-accent">
                A
              </span>
              <span className="hidden flex-col leading-none sm:flex">
                <span className="font-display text-[14px] font-medium tracking-tight">
                  Abinivesh M
                </span>
                <span className="mt-1 font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
                  AI Product Engineer
                </span>
              </span>
            </a>

            <nav className="hidden items-center gap-1 md:flex">
              {navLinks
                .filter((l) => !l.href.startsWith("/"))
                .map((link) => {
                  const id = link.href.replace("#", "");
                  const isActive = active === id;
                  return (
                    <a
                      key={link.name}
                      href={link.href}
                      className={`relative rounded-full px-3.5 py-2 text-[13px] transition-colors ${
                        isActive ? "text-ink" : "text-muted hover:text-ink"
                      }`}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="nav-active"
                          className="absolute inset-0 rounded-full border border-line bg-white/[0.045]"
                          transition={{ type: "spring", stiffness: 320, damping: 30 }}
                        />
                      )}
                      <span className="relative">{link.name}</span>
                    </a>
                  );
                })}
            </nav>

            <div className="flex items-center gap-2">
              <span className="hidden items-center gap-2 rounded-full border border-emerald-400/25 bg-emerald-400/[0.06] px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.12em] text-emerald-300/90 sm:inline-flex">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                </span>
                Open to work
              </span>

              <a
                href="/resume.html"
                target="_blank"
                rel="noreferrer"
                className="group hidden items-center gap-1.5 rounded-full border border-line bg-white/[0.04] px-4 py-2 text-[13px] text-ink transition-colors hover:border-accent/50 hover:bg-accent/10 sm:inline-flex"
              >
                Résumé
                <ArrowUpRight className="h-3.5 w-3.5 text-muted transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
              </a>

              <button
                onClick={() => setOpen((v) => !v)}
                className="grid h-9 w-9 place-items-center rounded-full border border-line bg-white/[0.03] md:hidden"
                aria-label={open ? "Close menu" : "Open menu"}
                aria-expanded={open}
              >
                {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-[#07080A]/96 backdrop-blur-xl md:hidden"
          >
            <div className="shell flex h-full flex-col justify-center gap-2">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  target={link.href.startsWith("/") ? "_blank" : undefined}
                  rel={link.href.startsWith("/") ? "noreferrer" : undefined}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.06 * i, duration: 0.4 }}
                  className="flex items-baseline justify-between border-b border-line py-4 font-display text-[30px] tracking-tight"
                >
                  {link.name}
                  <span className="font-mono text-[11px] text-muted">0{i + 1}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
