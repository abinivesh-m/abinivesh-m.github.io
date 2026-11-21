p = "src/components/Hero.tsx"
s = open(p, encoding="utf-8").read()

# 1. Fix framer-motion import
s = s.replace(
    'import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";',
    'import { useReducedMotion } from "framer-motion";',
    1,
)

# 2. Remove EASE import line
s = s.replace('import { EASE } from "./ui/Reveal";\n', '', 1)

# 3. Remove motion values and springs
import re
s = re.sub(
    r'const tiltX = useMotionValue\(0\);\s*const tiltY = useMotionValue\(0\);\s*const sx = useSpring\(tiltX, \{ stiffness: 120, damping: 18 \}\);\s*const sy = useSpring\(tiltY, \{ stiffness: 120, damping: 18 \}\);\s*',
    '',
    s,
)

# 4. Remove onMove handler
s = re.sub(
    r'const onMove = \(e: React\.MouseEvent<HTMLDivElement>\) => \{[^}]+\}\s*',
    '',
    s,
)

# 5. Remove onLeave handler
s = re.sub(
    r'const onLeave = \(\) => \{[^}]+\}\s*',
    '',
    s,
)

# 6. Remove perspective style (now empty string)
s = s.replace('style={{ perspective: 900 }}', '', 1)

open(p, "w", encoding="utf-8").write(s)
print("cleaned")
for i, l in enumerate(s.splitlines()[:20], 1):
    print(i, l)
"