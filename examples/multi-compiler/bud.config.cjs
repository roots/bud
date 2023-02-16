/**
 * Configuration which runs two instances of bud.
 *
 * Each can be uniquely configured.
 * ```
 */
module.exports = async ({make, path}) => {
  /**
   * Make `theme` workspace in `./theme` and setup entrypoints
   * Files will be output to `./theme/dist`
   */
  await make({label: 'theme', basedir: path('theme')}, async theme =>
    theme.entry('theme', ['theme.js', 'theme.css']),
  )

  /**
   * Make plugin workspace in `./plugin` and setup entrypoints
   * Files will be output to `./plugin/dist`
   */
  await make({label: 'plugin', basedir: path('plugin')}, async plugin =>
    plugin.entry('plugin', ['plugin.js', 'plugin.css']),
  )
}
