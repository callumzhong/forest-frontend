const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['ZPIX', ...defaultTheme.fontFamily.sans],
      },
      boxShadow: {
        border: '0 0 1px 2px rgba(255,255,255,0.8)',
        inner: '3px 0px 15px 5px rgb(0 0 0 / 75%) inset',
      },
      backgroundImage: {
        hero: 'url("https://img.itch.zone/aW1hZ2UvMTIxNjU4LzU2MDQxMC5wbmc=/original/hCUwLQ.png")',
      },
      animation: {
        fill: 'fill 1s linear',
        character: 'character 1s steps(4) infinite',
        'spin-slow': 'spin 3s linear infinite',
      },
    },
  },
  variants: {
    imageRendering: ['responsive'],
  },
  plugins: [
    require('tailwindcss-image-rendering')(),
    require('tailwind-scrollbar'),
  ],
};
