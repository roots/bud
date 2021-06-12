const imagemin = require('@roots/bud-imagemin')

module.exports = app =>
  app.use([imagemin]).template().entry({app: 'app.js'})
