import {Framework} from '@roots/bud-framework'
import {GlobTask, isArray} from '@roots/bud-support'

declare module '@roots/bud-framework' {
  interface Framework {
    /**
     * ## globs  [💁 Fluent]
     *
     * Generate an entrypoint from assets matching a
     * [fast-glob](https://git.io/JkGbw) formatted string.
     *
     * ### Globbing
     *
     * **Supported patterns**
     *
     * - `*` matches any number of characters, but not `/`
     * - `?` matches a single character, but not `/`
     * - `**` matches any number of characters, including `/`, as long as it's theonly thing in a path part
     * - `{}` allows for a comma-separated list of "or" expressions
     * - `!` at the beginning of a pattern will negate the match
     *
     * ### Usage
     *
     * Create an app bundle comprised of all js assets in the src root:
     *
     * ```js
     * app.globs({
     *   'app': '*.js',
     *})
     * ```
     */
    globs: Framework.Api.Globs
  }

  namespace Framework.Api {
    export type Globs = (patterns: {
      [key: string]: GlobTask['pattern'] | string
    }) => Framework
  }
}

export const globs: Framework.Api.Globs = function (patterns) {
  const options = {
    cwd: this.src(),
    expandDirectories: true,
  }

  /**
   * Add entrypoints
   */
  const assets = Object.entries(patterns).reduce(
    (a, [name, task]) => ({
      ...a,
      [name]: this.disk.glob.sync(
        isArray(task) ? task : [task],
        options,
      ),
    }),
    {},
  )

  this.hooks.on(`webpack.entry`, entry => ({
    ...entry,
    ...assets,
  }))

  return this
}
