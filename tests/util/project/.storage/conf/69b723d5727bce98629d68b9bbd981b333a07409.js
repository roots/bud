import forms from '@tailwindcss/forms'
export default {
  content: [`./src/**/*.{js,ts,tsx}`],
  theme: {
    extend: {
      colors: {
        primary: `red`,
      },
    },
  },
  plugins: [forms],
}
