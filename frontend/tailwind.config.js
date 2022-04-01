module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      spacing: { 128: "32rem" },
      brightness: ["hover", "focus"],
      zIndex: {
        902: 902,
        903: 903,
        904: 904,
      },
      colors: {
        primary: "hsl(159, 48%, 72%)",
        income: "hsl(145, 91%, 71%)",
        expenses: "hsl(41, 91%, 71%)",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
  important: true,
};
