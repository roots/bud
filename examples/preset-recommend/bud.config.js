module.exports = async app => {
  app.entry('main', 'index.{js,css}').minimize()
}
