module.exports = async app => {
  app.entry('app', await app.glob('@src/index.{js,css}')).minimize()
}
