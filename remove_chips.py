p = "src/components/Hero.tsx"
s = open(p, encoding="utf-8").read()

# Remove the entire floating chips block
old = '''              {/* floating chips */}
                <>
                  {floatChips.map((chip) => (
                    <span
                      key={chip.text}
                      className={`absolute ${chip.className} hidden rounded-full border border-line bg-[#0B0D12]/85 px-3 py-1.5 font-mono text-[10.5px] tracking-tight text-[#C7CBD4] shadow-[0_8px_30px_rgba(0,0,0,0.5)] backdrop-blur sm:block`}
                    >
                      {chip.text}
                    </span>
                  ))}
                </>'''

new = ''

if old in s:
    s = s.replace(old, new, 1)
    open(p, "w", encoding="utf-8").write(s)
    print("removed chips")
else:
    print("OLD NOT FOUND")
    idx = s.find("floating chips")
    if idx >= 0:
        print(s[idx:idx+500])