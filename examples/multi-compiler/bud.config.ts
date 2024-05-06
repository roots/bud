import {bud} from '@roots/bud'

/**
 * Make `theme` workspace in `./theme` and setup entrypoints
 * Files will be output to `./theme/dist`
 */
await bud.make({label: 'theme', basedir: bud.path('theme')}, async theme =>
  theme.entry('theme', ['theme.js', 'theme.css']),
)

/**
 * Make plugin workspace in `./plugin` and setup entrypoints
 * Files will be output to `./plugin/dist`
 */
await bud.make(
  {label: 'plugin', basedir: bud.path('plugin'), dependsOn: [`theme`]},
  async plugin => plugin.entry('plugin', ['plugin.js', 'plugin.css']),
)
