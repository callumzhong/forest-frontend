module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        border: '0 0 1px 2px rgba(255,255,255,0.8)',
        inner: '3px 0px 15px 5px rgb(0 0 0 / 75%) inset',
      },
      backgroundImage: {
        hero: 'url("assets/images/ui/background_2.jpg")',
      },
      animation: {
        fill: 'fill 1s linear',
        character: 'character 1s steps(4) infinite',
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
