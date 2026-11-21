import re

p = "src/components/Hero.tsx"
s = open(p, encoding="utf-8").read()

# Fix framer-motion import
s = s.replace(
    "import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from \"framer-motion\";",
    "import { useReducedMotion } from \"framer-motion\";",
    1,
)

# Remove EASE import
s = s.replace('import { EASE } from "./ui/Reveal";', "", 1)

# Remove motion values block
s = re.sub(
    r"const tiltX = useMotionValue\(0\);\s*const tiltY = useMotionValue\(0\);\s*const sx = useSpring\(tiltX, \{ stiffness: 120, damping: 18 \}\);\s*const sy = useSpring\(tiltY, \{ stiffness: 120, damping: 18 \}\);\s*",
    "",
    s,
)

# Remove onMove handler
s = re.sub(
    r"const onMove = \(e: React\.MouseEvent<HTMLDivElement>\) => \{[^}]+\}\s*",
    "",
    s,
)

# Remove onLeave handler
s = re.sub(
    r"const onLeave = \(\) => \{[^}]+\}\s*",
    "",
    s,
)

# Remove perspective style
s = s.replace("style={{ perspective: 900 }}", "", 1)

open(p, "w", encoding="utf-8").write(s)
print("cleaned")
for i, l in enumerate(s.splitlines()[:25], 1):
    print(i, l)