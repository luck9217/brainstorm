/** @type {import("tailwindcss").Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./lib/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        paper: "#f5f2ea",
        ink: "#1f2937",
        mist: "#ece7dc",
        sage: "#839184",
        clay: "#cdbfae"
      },
      boxShadow: {
        float: "0 24px 60px rgba(58, 57, 51, 0.10)",
        soft: "0 12px 30px rgba(79, 74, 62, 0.08)"
      },
      backgroundImage: {
        grain: "radial-gradient(circle at top, rgba(255,255,255,0.85), transparent 55%), linear-gradient(135deg, rgba(131,145,132,0.08), rgba(255,255,255,0))"
      },
      borderRadius: {
        '4xl': "2rem"
      }
    }
  },
  plugins: []
};
