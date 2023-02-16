module.exports = async bud => {
  bud
    .html()
    .entry('app', 'app.js')
    .eslint.set(`fix`, true)
}
