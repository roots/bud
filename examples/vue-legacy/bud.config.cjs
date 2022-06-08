module.exports = async app => {
  app.entry('app', 'index').template({
    template: app.path('@src/index.html'),
  })
}
