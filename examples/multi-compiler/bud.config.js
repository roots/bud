module.exports = async app => {
  await app.make('theme', async theme => {
    theme
      .use('@roots/bud-babel')
      .setPath('dist', 'dist/theme')
      .entry('theme', ['theme.js', 'theme.css'])
      .minimize()
  })

  await app.make('plugin', async plugin => {
    plugin
      .use('@roots/bud-babel')
      .setPath('dist', 'dist/plugin')
      .entry('plugin', ['plugin.js', 'plugin.css'])
      .minimize()
  })
}
