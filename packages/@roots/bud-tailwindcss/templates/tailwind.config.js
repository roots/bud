module.exports = {
  mode: 'jit',
  purge: {
    content: ['./src/**/*.html', './src/**/*.js'],
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {},
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
