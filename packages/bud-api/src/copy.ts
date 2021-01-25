import {Framework} from '@roots/bud-framework'

declare module '@roots/bud-framework' {
  interface Framework<T> {
    /**
     * ## bud.copy  [💁 Fluent]
     *
     * Copy static assets to your output directory.
     *
     * You may specify a path to a specific file or
     * use glob syntax to match many files at once. [🔗 Documentation](#)
     *
     * ### Usage
     *
     * **Copy all files from `src/images`**
     *
     * ```js
     * bud.copy({from: 'images/*'})
     * ```
     *
     * **Copy all files from a path outside of `bud.src`**
     *
     * ```js
     * bud.copy({
     *   from: 'images/*',
     *   context: bud.project('assets')
     * })
     * ```
     *
     * **Copy all files to a path outside of `bud.dist`**
     *
     * ```js
     * bud.copy({
     *   from: 'images/*',
     *   to: '/app/cdn/media'
     * })
     * ```
     */
    copy: Framework.Api.Copy
  }

  namespace Framework.Api {
    export type Copy = (
      this: Framework,
      from: string,
      options: Copy.Options,
    ) => Framework

    namespace Copy {
      export interface Options {
        to: string
        context: string
        noErrorOnMissing: boolean
        globOptions: {
          ignore: string
        }
      }
    }
  }
}

export const copy: Framework.Api.Copy = function (
  from,
  options,
) {
  this.extensions.mutate(
    `copy-webpack-plugin.patterns`,
    patterns => [
      ...patterns,
      {
        from,
        to: options.to ?? this.dist(),
        context: options.context ?? this.src(),
        globOptions: options.globOptions,
        noErrorOnMissing: options.noErrorOnMissing ?? true,
      },
    ],
  )

  return this
}
