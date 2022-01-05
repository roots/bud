module.exports = async app => {
  app.assets([app.path('src', 'index.html')])

  await app.make('theme', async theme => {
    theme
      .setPath('dist', app.path('dist', 'theme'))
      .entry('theme', ['theme.js', 'theme.css'])
      .minimize()
  })

  await app.make('plugin', async plugin => {
    plugin
      .setPath('dist', app.path('dist', 'plugin'))
      .entry('plugin', ['plugin.js', 'plugin.css'])
      .minimize()
  })
}
