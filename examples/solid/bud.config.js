module.exports = app =>
  app
    .use([
      require('@roots/bud-babel'),
      require('@roots/bud-solid'),
    ])
    .template()
    .entry({app: '*.{js,css}'})
