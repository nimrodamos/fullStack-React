/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],

  // Enable dark mode support based on the 'dark' class
  darkMode: "class",

  theme: {
    extend: {
      backgroundImage: {
        "project-color": "linear-gradient(to right, #a78bfa, #ec4899, #f43f5e)", // Preserve the gradient
      },
    },
  },
  plugins: [],
};
