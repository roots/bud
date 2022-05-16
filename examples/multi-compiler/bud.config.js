module.exports = async app => {
  await app.make('theme', theme => {
    theme
      .setPath('@dist', 'dist/theme')
      .entry('theme', ['theme.js', 'theme.css'])
      .minimize()
  })

  await app.make('plugin', plugin => {
    plugin
      .setPath('@dist', 'dist/plugin')
      .entry('plugin', ['plugin.js', 'plugin.css'])
      .minimize()
  })
}
