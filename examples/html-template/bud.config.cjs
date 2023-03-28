module.exports = async app =>
  app
    .html({
      template: app.path('public/index.html'),
      replace: {
        TITLE: 'Demo',
        DESCRIPTION: 'html templating example',
        EXAMPLE: '#root content',
      },
      favicon: app.path('public/favicon.ico'),
    })
    .entry('app', '@src/index')
