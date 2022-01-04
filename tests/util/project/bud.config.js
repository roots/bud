module.exports = async app => {
  app
    .entry({
      app: '**/app.{js,css}',
    })
    .copy(['src/images/**/*'])
}
