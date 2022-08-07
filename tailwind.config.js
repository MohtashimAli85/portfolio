module.exports = {
  mode: "jit",
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        "float-rotate": "float-rotate 3s ease-in-out infinite",
        float: "float 3s ease-in-out infinite",
      },

      keyframes: {
        "float-rotate": {
          "0%, 100%": { transform: "translate(0,  0px) rotate(0deg)" },
          "65%": { transform: "translate(0, 15px) rotate(-30deg)" },
        },
        float: {
          "0%": { transform: "translate(0,  -7px) " },
          "65%": { transform: "translate(0, 7px) " },
          "100%": { transform: "translate(0,  -7px) " },
        },
      },
    },
    colors: {
      white: "#FFFFFF",
      primary: "#25F3C2",
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
