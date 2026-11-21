const stack = [
  "Python",
  "TypeScript",
  "FastAPI",
  "Flutter",
  "PostgreSQL",
  "AWS",
  "Docker",
  "LLM agents",
  "Gemini",
  "React",
  "CI/CD",
  "System design",
];

export function Marquee() {
  const row = [...stack, ...stack];
  return (
    <div className="marquee-mask relative overflow-hidden border-y border-line py-5">
      <div className="flex w-max animate-marquee items-center gap-10 whitespace-nowrap will-change-transform">
        {row.map((item, i) => (
          <span key={`${item}-${i}`} className="flex items-center gap-10">
            <span className="font-mono text-[11.5px] uppercase tracking-[0.18em] text-muted">
              {item}
            </span>
            <span className="h-1 w-1 rounded-full bg-accent/50" />
          </span>
        ))}
      </div>
    </div>
  );
}
