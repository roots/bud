module.exports = bud =>
  bud
    .use([
      require('@roots/bud-babel'),
      require('@roots/bud-typescript'),
    ])
    .entry({app: ['app.ts']})
    .html()
