module.exports = async bud => {
  bud
    .entry({app: ['app.css', 'app.js']})
    .minimize()
    .template()

    .tailwind.generateImports(['colors'])
}
