import re

p = "src/components/Hero.tsx"
s = open(p, encoding="utf-8").read()

# Remove Suspense and lazy imports
s = s.replace(
    "import { Suspense, lazy, useRef } from \"react\";",
    "import { useRef } from \"react\";",
    1,
)

# Remove Hero3DCanvas lazy import
s = s.replace(
    "const Hero3DCanvas = lazy(() => import(\"./Hero3D\").then((m) => ({ default: m.Hero3D })));",
    "",
    1,
)

# Remove the ErrorBoundary + Suspense wrapper for 3D
s = re.sub(
    r"<div className=\"pointer-events-none absolute inset-0 -z-0 hidden md:block\" aria-hidden>\s*<ErrorBoundary>\s*<Suspense fallback=\{null\}>\{!reduce && <Hero3DCanvas />\}</Suspense>\s*</ErrorBoundary>\s*</div>\s*",
    "",
    s,
)

# Remove ErrorBoundary import
s = s.replace('import { ErrorBoundary } from "./ui/ErrorBoundary";', "", 1)

open(p, "w", encoding="utf-8").write(s)
print("cleaned 3D")
for i, l in enumerate(s.splitlines()[:15], 1):
    print(i, l)