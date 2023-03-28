module.exports = async bud => {
  bud.html().entry({app: 'app.js'}).runtime().splitChunks().hash()
}
