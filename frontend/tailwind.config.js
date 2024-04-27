/** @type {import('tailwindcss').Config} */
import {bg_image_link} from "./src/utils/bg-image_link.js";
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'hero-pattern': `url(${bg_image_link})`,
      }
    },
  },
  plugins: [],
}

