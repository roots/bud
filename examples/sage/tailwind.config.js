module.exports = {
  content: ['resources/**/*.{js,html}'],
  theme: {
    extend: {
      colors: ({theme}) => ({
        gray: '#f7fafc',
      }),
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
