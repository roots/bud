const {resolve} = require(`path`)

module.exports = {
  content: [resolve(__dirname, `src/index.html`)],
  plugins: [],
  theme: {
    extend: {
      colors: {
        primary: `red`,
      },
    },
  },
}
