import colors from './colors.js'

const config = {
  content: ['./src/**/*.js'],
  theme: {
    extend: {
      colors, // Extend Tailwind's default colors
    },
  },
  plugins: [],
}

export default config
