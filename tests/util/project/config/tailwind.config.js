import forms from '@tailwindcss/forms'

export default {
  content: [`./src/**/*.{js,ts,tsx}`],
  plugins: [forms],
  theme: {
    extend: {
      colors: {
        primary: `red`,
      },
    },
  },
}
