module.exports = async app => {
  app
    .entry({
      app: {
        import: '**/app.{js,css}',
      },
    })
    .copy(['src/images/**/*'])
    .template({template: 'src/index.html'})
    .devtool(false)
    .watch('src/index.html')
}
