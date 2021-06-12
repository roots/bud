const imagemin = require('@roots/bud-imagemin')

module.exports = app =>
  app
    .use([imagemin])
    .template({
      template: app.path('src', 'index.html'),
    })
    .entry({app: 'app.js'})
