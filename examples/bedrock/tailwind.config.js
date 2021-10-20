module.exports = {
  purge: {
    content: [
      './web/app/plugins/example-plugin/resources/**/*.{php,vue,js}',
      './web/app/themes/sage/resources/**/*.{php,vue,js}',
    ],
  },
  jit: true,
  darkMode: false,
  theme: {
    extend: {
      colors: {},
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/typography')],
}
