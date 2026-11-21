p = "src/components/Hero.tsx"
s = open(p, encoding="utf-8").read()

old = """const quickStats = [

export function Hero() {"""

new = """const quickStats = [
  { value: "113", label: "LeetCode solved" },
  { value: "3×", label: "Hackathon wins" },
  { value: "2×", label: "IIT finals" },
  { value: "9.1", label: "CGPA / 10" },
];

export function Hero() {"""

if old in s:
    s = s.replace(old, new, 1)
    open(p, "w", encoding="utf-8").write(s)
    print("fixed")
else:
    print("OLD NOT FOUND")
    # show context
    idx = s.find("const quickStats = [")
    if idx >= 0:
        print(s[idx:idx+200])