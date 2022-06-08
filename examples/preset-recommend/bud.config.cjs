module.exports = async app => {
  app.entry('app', ['index.{js,css}']).minimize()
}
