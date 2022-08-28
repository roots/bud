/**
 * Configuration which runs two instances of bud.
 *
 * Each can be uniqueuely configured.
 * ```
 */
module.exports = async project => {
  /**
   * Make `theme` workspace in `./theme` and setup entrypoints
   * Files will be output to `./theme/dist`
   */
  await project.make(
    {
      label: 'theme',
      basedir: project.path('theme'),
    },
    async theme => theme.entry('theme', ['theme.js', 'theme.css']),
  )

  /**
   * Make plugin workspace in `./plugin` and setup entrypoints
   * Files will be output to `./plugin/dist`
   */
  await project.make(
    {
      label: 'plugin',
      basedir: project.path('plugin'),
    },
    async plugin => plugin.entry('plugin', ['plugin.js', 'plugin.css']),
  )
}
