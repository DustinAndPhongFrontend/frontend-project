module.exports = {
   content: [
      './app/**/*.{js,ts,jsx,tsx}',
      './components/**/*.{js,ts,jsx,tsx}',
   ],
   theme: {
      extend: {
         backgroundImage: {
            'wood-texture': "url('/wood.jpeg')",
            'parchment': "url('/parchment.jpg')",
            'parchment-hover': "url('/parchment-hover.jpg')",
         },
      },
   },
   plugins: [],
}