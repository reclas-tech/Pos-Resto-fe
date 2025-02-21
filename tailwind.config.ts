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
        primaryColor: "var(--primaryColor)",
        primaryTextColor: "var(--primaryTextColor)",
        secondaryColor: "var(--secondaryColor)",
        thirdColor: "var(--thirdColor)",
        background: "var(--background)",
        foreground: "var(--foreground)",
        grayColor: "var(--grayColor)",
        grayDark: "var(--grayDark)",
        danger: "var(--danger)",
      },
      backgroundImage: {
        splashScreenBg: "url('/assets/images/bg-second.png')",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      transitionProperty: {
        transform: "transform",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
