p = "src/components/Hero.tsx"
s = open(p, encoding="utf-8").read()

old = '''import { Suspense, useRef } from "react";
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { ArrowDownRight, ArrowUpRight, Github, Linkedin, Mail } from "lucide-react";
import { hero } from "../data/content";
import { ErrorBoundary } from "./ui/ErrorBoundary";
import { EASE } from "./ui/Reveal";

const Hero3DCanvas = lazy(() => import("./Hero3D").then((m) => ({ default: m.Hero3D })));
'''

new = '''import { useRef } from "react";
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { ArrowDownRight, ArrowUpRight, Github, Linkedin, Mail } from "lucide-react";
import { hero } from "../data/content";
import { EASE } from "./ui/Reveal";
'''

assert old in s, "old block not found"
s = s.replace(old, new, 1)
open(p, "w", encoding="utf-8").write(s)
print("done")
