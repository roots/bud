module.exports = async ({make}) => {
  make('theme', async theme => {
    theme
      .setPath('@dist', 'dist/theme')
      .entry('theme', ['theme.js', 'theme.css'])
      .minimize()
  }).make('plugin', async plugin => {
    plugin
      .setPath('@dist', 'dist/plugin')
      .entry('plugin', ['plugin.js', 'plugin.css'])
      .minimize()
  })
}
