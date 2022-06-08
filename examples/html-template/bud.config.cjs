module.exports = async app =>
  app
    .template({
      template: app.path('./public/index.html'),
      replace: {
        TITLE: 'Demo',
        DESCRIPTION: 'html templating example',
        EXAMPLE: '#root content',
      },
      favicon: 'public/favicon.ico',
    })
    .entry('app', '@src/index')
