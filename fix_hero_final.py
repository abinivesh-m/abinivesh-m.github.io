import re

p = "src/components/Hero.tsx"
s = open(p, encoding="utf-8").read()

# Fix the right column - remove motion.div closures and fix floating chips
# Find and replace from the photo div to the end of the right column
old = '''                <div className="relative h-[276px] w-[276px] overflow-hidden rounded-full border border-white/10 sm:h-[340px] sm:w-[340px]">
                  <img
                    src="/profile.jpg"
                    alt="Abinivesh M"
                    className="h-full w-full object-cover object-center"
                    loading="eager"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#081426]/55 via-transparent to-transparent" />
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
}'''

new = '''                <div className="relative h-[276px] w-[276px] overflow-hidden rounded-full border border-white/10 sm:h-[340px] sm:w-[340px]">
                  <img
                    src="/profile.jpg"
                    alt="Abinivesh M"
                    className="h-full w-full object-cover object-center"
                    loading="eager"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#081426]/55 via-transparent to-transparent" />
                </div>

                {/* floating chips */}
                {floatChips.map((chip) => (
                  <span
                    key={chip.text}
                    className={`absolute ${chip.className} hidden rounded-full border border-line bg-[#0B0D12]/85 px-3 py-1.5 font-mono text-[10.5px] tracking-tight text-[#C7CBD4] shadow-[0_8px_30px_rgba(0,0,0,0.5)] backdrop-blur sm:block`}
                  >
                    {chip.text}
                  </span>
                ))}

              <div className="mt-9 rounded-full border border-line bg-[#0B0D12]/70 px-4 py-2 backdrop-blur">
                <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
                  ECE @ SKCET · Coimbatore
                </span>
              </div>
            </div>
        </div>
      </div>
    </section>
  );
}'''

if old in s:
    s = s.replace(old, new, 1)
    open(p, "w", encoding="utf-8").write(s)
    print("fixed")
else:
    print("OLD NOT FOUND")
    # show what we have
    idx = s.find("floating chips")
    if idx >= 0:
        print("found at", idx)
        print(s[idx:idx+500])