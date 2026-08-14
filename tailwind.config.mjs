export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: "#FCFAF8",
        foreground: "#2C2A29",
        surface: "#F5EFEB",
        "surface-hover": "#E8E2D9",
        border: "#DED4C7",
        "text-muted": "#8C8276",
        accent: "#2C2A29",
        "accent-foreground": "#FCFAF8",
      },
      fontFamily: {
        display: ['"Bricolage Grotesque"', "sans-serif"],
        body: ['"Inter"', "sans-serif"],
      },
    },
  },
  plugins: [],
}
