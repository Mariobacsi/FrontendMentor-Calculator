module.exports = {
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: false,
  theme: {
    extend: {
      colors: {
        main: {
          light: "#3B4664",
          base: "#252D44",
          dark: "#181F32",
        },
        calcButton: {
          default: "#EAE3DBF",
          shade: "#B0A699",
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
