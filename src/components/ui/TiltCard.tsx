import { useRef, useState } from "react";
import type { CSSProperties, ReactNode } from "react";

export function TiltCard({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState<CSSProperties>({});

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    setStyle({
      transform: `perspective(1100px) rotateY(${x * 11}deg) rotateX(${-y * 10}deg) scale3d(1.02,1.02,1.02)`,
      transition: "transform 0.08s linear",
    });
  };
  const onLeave = () => {
    setStyle({
      transform: "perspective(1100px) rotateY(0deg) rotateX(0deg) scale3d(1,1,1)",
      transition: "transform 0.55s cubic-bezier(0.22, 1, 0.36, 1)",
    });
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ transformStyle: "preserve-3d", ...style }}
      className={className}
    >
      {children}
    </div>
  );
}
