/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],

  theme: {
    extend: {
      backgroundImage: {
        "project-color": "linear-gradient(to right, #a78bfa, #ec4899, #f43f5e)", // שמירת הגרדיאנט
      },
    },
  },
  plugins: [],
};
