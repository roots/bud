module.exports = async app => {
  app
    .entry({
      app: {
        import: '**/app.{js,css}',
      },
    })
    .copy(['src/images/**/*'])
}
