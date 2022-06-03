module.exports = async app =>
  app
    .template({
      template: 'public/index.html',
    })
    .entry({
      app: ['app.css'],
    })
