/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#f6697b",
        "primary-hover": "#FFF7F6",
        secondary: "#2F5EB7",
        content: "#685F78",
        "primary-bg": "#FAFAFA",
        "content-secondary": "#392C7D",
      },
      container: {
        center: true,
      },
    },
  },
  plugins: [
    function ({ addComponents }) {
      addComponents({
        ".container": {
          "@screen 2xl": {
            maxWidth: "1248px",
          },
        },
      });
    },
  ],
};
