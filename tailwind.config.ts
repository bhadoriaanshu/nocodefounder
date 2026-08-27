import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-outfit)", "sans-serif"],
        serif: ["var(--font-playfair)", "serif"],
      },
      colors: {
        navy: "#0E1836",
        deepnavy: "#0E0F19",
        cream: "#F9F7F2",
        ivory: "#FFFDF8",
        golden: "#FBD54B",
        softyellow: "#FADC98",
        magenta: "#D7234E",
        purple: "#5058B7",
        green: "#6A9B68",
        blue: "#28548A",
        brown: "#5F443D",
        beige: "#C28E6D",
        gray: "#676564",
        black: "#101019",
      },
    },
  },
  plugins: [],
};
export default config;
