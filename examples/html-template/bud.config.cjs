module.exports = async app =>
  app
    .template({
      template: app.path('./public/index.html'),
      replace: {
        TITLE: 'Demo',
        DESCRIPTION: 'html templating example',
      },
      favicon: 'public/favicon.ico',
    })
    .define({
      TITLE: 'Demo',
      DESCRIPTION: 'html templating example',
    })
    .entry('app', 'index.js')
