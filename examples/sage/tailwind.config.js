export default {
  content: ['resources/**/*.{js,css,html}'],
  theme: {
    extend: {
      colors: {
        brand: {
          gray: '#f7fafc',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      fontSize: {
        xl: '1.25rem',
        custom: '.625rem',
      },
      spacing: {
        72: '18rem',
      }
    },
  },
  plugins: [],
}
