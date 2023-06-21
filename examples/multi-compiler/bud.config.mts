import type {Bud} from '@roots/bud'

/**
 * Configuration which runs two instances of bud.
 *
 * Each can be uniquely configured.
 * ```
 */
export default async ({make, path, ...app}: Bud) => {
  await Promise.all([
    /**
     * Make `theme` workspace in `./theme` and setup entrypoints
     * Files will be output to `./theme/dist`
     */
    make({label: 'theme', basedir: path('theme')}, async theme =>
      theme.entry('theme', ['theme.js', 'theme.css']),
    ),

    /**
     * Make plugin workspace in `./plugin` and setup entrypoints
     * Files will be output to `./plugin/dist`
     */
    make({label: 'plugin', basedir: path('plugin')}, async plugin =>
      plugin.entry('plugin', ['plugin.js', 'plugin.css']),
    ),
  ])
}
