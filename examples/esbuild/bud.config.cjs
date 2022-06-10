module.exports = async app => {
  app.template().entry({app: 'app.js'}).runtime().splitChunks().hash()
}
