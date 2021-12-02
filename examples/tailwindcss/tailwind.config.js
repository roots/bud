module.exports = {
  mode: 'jit',
  purge: ['src/**/*.{js,css,html}', 'static/**/*.{js,css,html}'],
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
