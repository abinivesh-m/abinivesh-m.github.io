/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Inter Tight", "Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      colors: {
        ink: "#F4F5F7",
        muted: "#8B909A",
        canvas: "#0B1220",
        panel: "#0C0E12",
        line: "rgba(255,255,255,0.09)",
        accent: "#6E8BFF",
        violet: "#A78BFA",
      },
      maxWidth: {
        shell: "1180px",
      },
      letterSpacing: {
        tightest: "-0.045em",
      },
    },
  },
  plugins: [],
}
