module.exports = {
  parent: app =>
    app
      .setPath('dist', dist => `${dist}/app`)
      .use(require('@roots/bud-esbuild'))
      .entry('app', ['app.js', 'app.css']),

  theme: app =>
    app
      .setPath('dist', dist => `${dist}/theme`)
      .use(require('@roots/bud-babel'))
      .entry('theme', ['theme.js', 'theme.css']),

  plugin: app =>
    app
      .setPath('dist', dist => `${dist}/plugin`)
      .use(require('@roots/bud-esbuild'))
      .entry('plugin', ['plugin.js', 'plugin.css']),
}
