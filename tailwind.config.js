module.exports = {
   content: [
      './app/**/*.{js,ts,jsx,tsx}',
      './components/**/*.{js,ts,jsx,tsx}',
   ],
   theme: {
      extend: {
         backgroundImage: {
            'wood-texture': "url('https://dustinandphongfrontend.github.io/frontend-project/wood.jpeg')",
            'parchment': "url('https://dustinandphongfrontend.github.io/frontend-project/parchment.jpg')",
            'parchment-hover': "url('https://dustinandphongfrontend.github.io/frontend-project/parchment-hover.jpg')",
         },
      },
   },
   plugins: [],
}