/**
 * Configuration which runs two instances of bud.
 *
 * Each can be uniqueuely configured. You may wish to pass the
 * `--no-inject` flag to stop extension autoloading.
 *
 * In that case you will want ot use `bud.use` or `bud.extensions.add` to
 * add the extensions you want for each compiler.
 *
 * @example
 * Syncronously adding extension: This extension will be loaded after the config
 * is processed. You can't configure the extension in the config file.
 *
 * ```js
 * import Extension from '@roots/bud-react'
 * export default async => bud => {
 *   bud.use(Extension)
 * }
 * ```
 *
 * @example
 * Add an extension asynchronously. This extension will be registered immediately
 * and you can configure it as normal.
 *
 * ```js
 * import Extension from '@roots/bud-react'
 * export default async => bud => {
 *   await bud.extensions.add(Extension)
 * }
 * ```
 */
module.exports = async app => {
  /**
   * Make `theme` workspace in `./theme`
   * and setup entrypoints
   *
   * Files will be output to `./theme/dist`
   */
  app.make(
    {
      name: 'theme',
      dir: app.path('./theme'),
    },
    async theme => theme.entry('theme', ['theme.js', 'theme.css']),
  )

  /**
   * Make plugin workspace in `./plugin`
   * and setup entrypoints
   */
  app.make(
    {
      name: 'plugin',
      dir: app.path('./plugin'),
    },
    async plugin => plugin.entry('plugin', ['plugin.js', 'plugin.css']),
  )
}
