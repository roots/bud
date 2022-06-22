module.exports = async app => {
  app
    .template({
      template: app.path('public/index.html'),
    })
    .hash()
    .entry('app', ['app.css'])
    .entry('app2', ['app2.css'])
    .splitChunks()
    .critical.setOptions(options => ({
      ...options,
      replace: '%INLINE_CSS%',
      criticalOptions: {
        html: app.path('public/index.html'),
        base: '/',
      },
    }))
    .enable()
}
