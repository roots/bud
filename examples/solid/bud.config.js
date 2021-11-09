module.exports = async app =>
  app.template().entry({app: '*.{js,css}'})
