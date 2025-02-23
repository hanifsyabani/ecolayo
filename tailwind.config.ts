import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#00B207",
        secondary: "#2C742F",
        tertiary: "#84D187",
        quaternary: "#d5d5d5",
        quinary: "#c4c4c4",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
