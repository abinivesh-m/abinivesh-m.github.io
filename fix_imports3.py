p = "src/components/Hero.tsx"
s = open(p, encoding="utf-8").read()

# Add back EASE import and define reduce
# Current imports:
# 1 import { useRef } from "react";
# 2 import { useReducedMotion } from "framer-motion";

# Fix: add EASE and use it to define reduce
old = '''import { useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { ArrowDownRight, ArrowUpRight, Github, Linkedin, Mail } from "lucide-react";
import { hero } from "../data/content";'''

new = '''import { useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { ArrowDownRight, ArrowUpRight, Github, Linkedin, Mail } from "lucide-react";
import { hero } from "../data/content";
import { EASE } from "./ui/Reveal";

const reduce = useReducedMotion();'''

if old in s:
    s = s.replace(old, new, 1)
    open(p, "w", encoding="utf-8").write(s)
    print("fixed imports and reduce")
else:
    print("OLD NOT FOUND")
    # Check what we have
    for i, l in enumerate(s.splitlines()[:10], 1):
        print(i, l)