p = "src/components/Hero.tsx"
s = open(p, encoding="utf-8").read()

old = '''            <div
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

                {/* floating chips */}'''

new = '''            <div
              onMouseMove={onMove}
              onMouseLeave={onLeave}
              className="relative mx-auto flex max-w-[440px] flex-col items-center justify-center py-6"
            >
              <div className="relative h-[276px] w-[276px] overflow-hidden rounded-full border border-white/10 sm:h-[340px] sm:w-[340px]">
                <img
                  src="/profile.jpg"
                  alt="Abinivesh M"
                  className="h-full w-full object-cover object-center"
                  loading="eager"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#081426]/55 via-transparent to-transparent" />
              </div>

              {/* floating chips */}'''

assert old in s, "old block not found"
s = s.replace(old, new, 1)
open(p, "w", encoding="utf-8").write(s)
print("done")
"