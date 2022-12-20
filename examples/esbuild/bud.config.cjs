module.exports = async bud => {
  bud.template().entry({app: 'app.js'}).runtime().splitChunks().hash()
}
