import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { Nav } from "./components/Nav";
import { Hero } from "./components/Hero";
import { Marquee } from "./components/Marquee";
import { Metrics } from "./components/Metrics";
import { Work } from "./components/Work";
import { Experience } from "./components/Experience";
import { Achievements } from "./components/Achievements";
import { Skills } from "./components/Skills";
import { Coding } from "./components/Coding";
import { Contact } from "./components/Contact";

function Spotlight() {
  const x = useMotionValue(-500);
  const y = useMotionValue(-500);
  const sx = useSpring(x, { stiffness: 90, damping: 22, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 90, damping: 22, mass: 0.6 });

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [x, y]);

  return (
    <motion.div
      aria-hidden
      style={{ left: sx, top: sy }}
      className="pointer-events-none fixed z-0 hidden h-[620px] w-[620px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(110,139,255,0.55),transparent_62%)] opacity-[0.07] blur-[10px] md:block"
    />
  );
}

function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 900);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
      className={`fixed bottom-6 right-6 z-40 grid h-10 w-10 place-items-center rounded-full border border-line bg-[#0B0D12]/85 text-muted backdrop-blur transition-all duration-500 hover:border-accent/40 hover:text-ink ${
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
      }`}
    >
      <ArrowUp className="h-4 w-4" />
    </button>
  );
}

export default function App() {
  return (
    <div className="relative min-h-screen bg-canvas">
      <div className="grain" aria-hidden />
      <Spotlight />
      <Nav />
      <main className="relative z-10">
        <Hero />
        <Marquee />
        <Metrics />
        <Work />
        <Experience />
        <Achievements />
        <Skills />
        <Coding />
        <Contact />
      </main>
      <BackToTop />
    </div>
  );
}
