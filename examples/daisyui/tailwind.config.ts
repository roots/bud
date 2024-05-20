import type {Config} from 'tailwindcss'

export default {
  content: ['src/**/*.js'],
  plugins: [await import('daisyui').then(m => m.default)],
} satisfies Config
