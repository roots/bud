module.exports = async bud => {
  bud
    .entry({app: ['app.css', 'app.js']})
    .minimize()
    .template()
    .tap(bud => {
      bud.dump(bud.postcss.all())
    })
}
