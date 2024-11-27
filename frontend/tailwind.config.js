/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      container: {
        center: true,
        padding: "1.5rem",
        screens: {
          sm: "100%",
          md: "100%",
          lg: "100%",
          xl: "1080px",
        },
      },
    },
  },
  plugins: [],
};
