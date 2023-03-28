module.exports = async bud => {
  bud
    .entry({app: ['app.css', 'app.js']})
    .minimize()
    .html()
    .tailwind.generateImports(['colors'])
}
