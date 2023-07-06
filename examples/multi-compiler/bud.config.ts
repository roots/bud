import {bud} from '@roots/bud'

/**
 * Configuration which runs two instances of bud.
 *
 * Each can be uniquely configured.
 * ```
 */
await Promise.all([
  /**
   * Make `theme` workspace in `./theme` and setup entrypoints
   * Files will be output to `./theme/dist`
   */
  bud.make({label: 'theme', basedir: bud.path('theme')}, async theme =>
    theme.entry('theme', ['theme.js', 'theme.css']),
  ),

  /**
   * Make plugin workspace in `./plugin` and setup entrypoints
   * Files will be output to `./plugin/dist`
   */
  bud.make({label: 'plugin', basedir: bud.path('plugin')}, async plugin =>
    plugin.entry('plugin', ['plugin.js', 'plugin.css']),
  ),
])
