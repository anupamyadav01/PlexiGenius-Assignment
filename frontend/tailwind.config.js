/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    theme: {
      extend: {
        animation: {
          jump: "jump 1s ease-in-out infinite",
        },
        keyframes: {
          jump: {
            "0%": { transform: "translateY(0)" },
            "25%": { transform: "translateY(-10px)" },
            "50%": { transform: "translateY(0)" },
            "75%": { transform: "translateY(-5px)" },
            "100%": { transform: "translateY(0)" },
          },
        },
      },
    },
  },
  plugins: [],
};
