module.exports = bud =>
  bud
    .entry({app: ['app.css', 'app.js']})
    .minimize()
    .template()
