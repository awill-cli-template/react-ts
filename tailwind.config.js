/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        Ali: "AlibabaPuHuiTi-Regular",
        AliMedium: "AlibabaPuHuiTi-2-65-Medium",
        Pang: "PangMenZhengDao",
      },
    },
  },
  plugins: [],
};
