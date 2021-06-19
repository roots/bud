module.exports = {
  parent: app =>
    app
      .use(require('@roots/bud-esbuild'))
      .entry({vanilla: ['demo.js', 'foo.css']}),

  babel: app =>
    app
      .use(require('@roots/bud-babel'))
      .entry({app: ['app.js']}),

  styles: app => app.entry({styles: ['global.css']}),
}
