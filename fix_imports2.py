p = "src/components/Hero.tsx"
s = open(p, encoding="utf-8").read()

# Fix line 1: remove Suspense (not needed now)
s = s.replace('import { Suspense, useRef } from "react";', 'import { useRef } from "react";', 1)

# Add EASE import after lucide import
s = s.replace(
    'import { hero } from "../data/content";\n',
    'import { hero } from "../data/content";\nimport { EASE } from "./ui/Reveal";\n',
    1,
)

# Remove lazy import line
s = s.replace('const Hero3DCanvas = lazy(() => import("./Hero3D").then((m) => ({ default: m.Hero3D })));', '', 1)
# remove leftover blank line
s = s.replace('\n\n\nconst quickStats', '\n\nconst quickStats', 1)

open(p, "w", encoding="utf-8").write(s)
print("done")
# verify
for i, l in enumerate(s.splitlines()[:10], 1):
    print(i, l)
"