p = "src/components/Hero.tsx"
s = open(p, encoding="utf-8").read()

# Fix: remove the module-level reduce, add it inside the component
old = '''import { useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { ArrowDownRight, ArrowUpRight, Github, Linkedin, Mail } from "lucide-react";
import { hero } from "../data/content";
import { EASE } from "./ui/Reveal";

const reduce = useReducedMotion();

const quickStats = ['''

new = '''import { useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { ArrowDownRight, ArrowUpRight, Github, Linkedin, Mail } from "lucide-react";
import { hero } from "../data/content";
import { EASE } from "./ui/Reveal";

const quickStats = ['''

if old in s:
    s = s.replace(old, new, 1)
    # Now add reduce inside the component function
    s = s.replace(
        "export function Hero() {",
        "export function Hero() {\n  const reduce = useReducedMotion();",
        1,
    )
    open(p, "w", encoding="utf-8").write(s)
    print("fixed reduce hook placement")
else:
    print("OLD NOT FOUND")
    # Check current state
    for i, l in enumerate(s.splitlines()[:15], 1):
        print(i, l)