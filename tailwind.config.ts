import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#ebe4dc",
          secondary: "#d3bc8e",
          accent: "#856041",
          neutral: "#eee5d7",
          "base-100": "#f5f1eb",
          info: "#3b4354",
          success: "#bfcd75",
          warning: "#b2512e",
          error: "#b2512e",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};
export default config;
