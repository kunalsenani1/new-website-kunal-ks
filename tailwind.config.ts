import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#050608",
        steel: "#88919d",
        cyanfire: "#00f0ff",
        amberglow: "#ffb545",
        record: "#ff3158"
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
        display: ["var(--font-space)", "Space Grotesk", "Inter", "sans-serif"]
      },
      boxShadow: {
        glow: "0 0 40px rgba(0, 240, 255, 0.18)",
        amber: "0 0 45px rgba(255, 181, 69, 0.18)"
      },
      backgroundImage: {
        "radial-cyan": "radial-gradient(circle at center, rgba(0,240,255,.18), transparent 42%)",
        "radial-amber": "radial-gradient(circle at center, rgba(255,181,69,.16), transparent 44%)"
      }
    }
  },
  plugins: []
};

export default config;
