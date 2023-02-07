// eslint-disable-next-line no-undef
const colors = require("tailwindcss/colors");

module.exports = {
  purge: ["./index.html", "./src/**/*.vue"],
  darkMode: false,
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      black: colors.black,
      white: colors.white,
      gray: colors.gray,
      emerald: colors.emerald,
      indigo: colors.indigo,
      yellow: colors.yellow,
      red: colors.red,
      slate: colors.slate,
      primary: "#F7BE38",
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
