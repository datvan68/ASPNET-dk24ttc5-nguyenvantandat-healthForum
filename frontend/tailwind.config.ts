import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eefcf5",
          100: "#d6f7e4",
          500: "#2a9d67",
          700: "#1d6f48",
          950: "#082614",
        },
      },
      boxShadow: {
        soft: "0 20px 45px -25px rgba(15, 23, 42, 0.35)",
      },
      backgroundImage: {
        "mesh-glow":
          "radial-gradient(circle at top left, rgba(42,157,103,0.24), transparent 28%), radial-gradient(circle at bottom right, rgba(14,116,144,0.18), transparent 24%)",
      },
    },
  },
  plugins: [],
};

export default config;
