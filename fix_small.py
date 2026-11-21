import re

p = "src/components/Hero.tsx"
s = open(p, encoding="utf-8").read()

# 1. Remove the translateZ style from floating chips
s = s.replace('style={{ transform: "translateZ(40px)" }}', '', 1)

# 2. Remove </motion.div> tags (there are 2)
s = s.replace('</motion.div>', '', 2)

# 3. Remove the style={{ perspective: 900 }} if still there
s = s.replace('style={{ perspective: 900 }}', '', 1)

open(p, "w", encoding="utf-8").write(s)
print("fixed small issues")
for i, l in enumerate(s.splitlines()[195:220], 196):
    print(i, l)
"