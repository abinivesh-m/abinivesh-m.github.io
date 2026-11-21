p = "src/components/Hero.tsx"
s = open(p, encoding="utf-8").read()

# Remove translateZ style
s = s.replace('style={{ transform: "translateZ(40px)" }}', "")

# Remove motion.div closing tags
s = s.replace("</motion.div>", "")

# Remove perspective style
s = s.replace("style={{ perspective: 900 }}", "")

open(p, "w", encoding="utf-8").write(s)
print("done")
for i, l in enumerate(s.splitlines()[195:220], 196):
    print(i, l)