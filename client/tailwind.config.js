module.exports = {
  darkMode: 'class',  
  content: ["./src/**/*.{html,js}"],
  theme: {
    fontFamily: {
      'eczar': ['Eczar', 'serif'],
      'serif': ['ui-serif', 'Georgia'],
    },
    extend: {
      backgroundImage: {
        'volcano_light_3': "url(/src/assets/volcano_light_3.jpg)",
        'volcano_dark_3': "url(/src/assets/volcano_dark_3.jpg)",
      },
      margin: {
        '1/2': '1px',
      }
    },
  },
  plugins: [],
}
