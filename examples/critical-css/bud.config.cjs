module.exports = async app => {
  app
    .html({
      template: app.path('public/index.html'),
    })
    .hash()
    .entry('app', ['app.css'])
    .entry('app2', ['app2.css'])
    .splitChunks()
    .critical.src(app.path(`public/index.html`))
    .enable()
}
