import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        red: {
          DEFAULT: "#E64066",
        },
        blue: {
          DEFAULT: "#3E495B",
          10: "#3040C4",
        },
        gray: {
          DEFAULT: "#82818F",
          10: "#F8F8F8",
          15: "#F7F9FC",
          20: "#E9E9E9",
          30: "#82818F",
          40: "#6F6F6F",
          50: "#6B6A75",
        },
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light"],
  },
};
export default config;
