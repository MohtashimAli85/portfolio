module.exports = {
  mode: "jit",
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
      aqua: "#25F3C2",
      "baltic-sea": "#262626",
      "white-smoke": "#F4F5F7",
      "rangoon-green": "#1B1B1B",
    },
    fontFamily: {
      sans: ["Sen", "sans-serif"],
      // serif: ["Merriweather", "serif"],
    },
  },
  plugins: [],
};
