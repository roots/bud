module.exports = async bud => {
  bud.entry('app', 'app.js').minimize().splitChunks().html()
}
