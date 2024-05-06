import type {Config} from 'tailwindcss'
import colors from './colors'

export default {
  content: ['./src/**/*.js'],
  theme: {
    extend: {
      colors, // Extend Tailwind's default colors
    },
  },
  plugins: [],
} satisfies Config
