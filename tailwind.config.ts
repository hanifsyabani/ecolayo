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
        primary: "#f9f9f9",
        secondary: "#f3f3f3",
        tertiary: "#e5e5e5",
        quaternary: "#d5d5d5",
        quinary: "#c4c4c4",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
