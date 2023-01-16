const {resolve} = require(`path`)

module.exports = {
  content: [resolve(__dirname, `src/index.html`)],
  theme: {
    extend: {
      colors: {
        primary: `red`,
      },
    },
  },
  plugins: [],
}
