export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#f1faf3",
          100: "#dcf2e2",
          200: "#bce4c8",
          300: "#8ccea3",
          400: "#57b17a",
          500: "#33935c",
          600: "#227649",
          700: "#1b5e3c",
          800: "#184b32",
          900: "#143e2a",
          950: "#0a2318"
        },
        secondary: {
          50: "#fbf8ee",
          100: "#f5eecd",
          200: "#eadb9c",
          300: "#dcc061",
          400: "#d1a938",
          500: "#c1932b",
          600: "#a47421",
          700: "#83571f",
          800: "#6c471f",
          900: "#5c3c1e",
          950: "#331f0f"
        },
        accent: {
          50: "#eff7fb",
          100: "#dcedf5",
          200: "#bfdeeb",
          300: "#92c8dc",
          400: "#5ea9c6",
          500: "#3f8dac",
          600: "#337191",
          700: "#2c5c76",
          800: "#294e63",
          900: "#264254",
          950: "#172a37"
        },
        neutral: {
          0: "#ffffff",
          50: "#f8f9f7",
          100: "#eef0ec",
          200: "#dde1d8",
          300: "#c2c8ba",
          400: "#9ba392",
          500: "#79826f",
          600: "#5e6656",
          700: "#4a5044",
          800: "#363a32",
          900: "#24261f",
          950: "#15160f"
        }
      },
      fontFamily: {
        display: ["'Fraunces'", "serif"],
        body: ["'Inter'", "sans-serif"]
      },
      fontSize: {
        "display-xl": ["4.5rem", { lineHeight: "1.05", letterSpacing: "-0.02em" }],
        "display-lg": ["3.5rem", { lineHeight: "1.08", letterSpacing: "-0.02em" }],
        "display-md": ["2.5rem", { lineHeight: "1.12", letterSpacing: "-0.01em" }],
        "display-sm": ["1.875rem", { lineHeight: "1.2", letterSpacing: "-0.01em" }]
      },
      spacing: {
        18: "4.5rem",
        22: "5.5rem",
        30: "7.5rem"
      },
      borderRadius: {
        card: "1.25rem",
        pill: "999px"
      },
      boxShadow: {
        soft: "0 1px 2px rgba(20, 30, 22, 0.04), 0 4px 16px rgba(20, 30, 22, 0.06)",
        lifted: "0 2px 4px rgba(20, 30, 22, 0.06), 0 12px 32px rgba(20, 30, 22, 0.10)",
        focus: "0 0 0 3px rgba(51, 147, 92, 0.35)"
      },
      transitionTimingFunction: {
        standard: "cubic-bezier(0.22, 1, 0.36, 1)"
      }
    }
  },
  plugins: []
}
