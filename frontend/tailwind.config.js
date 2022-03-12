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
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
