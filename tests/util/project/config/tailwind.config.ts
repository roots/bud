import forms from '@tailwindcss/forms'

export default {
  content: [`./src/index.html`, `./src/**/*.js`],
  theme: {
    extend: {
      colors: {
        primary: `red`,
      },
    },
  },
  plugins: [forms],
}
