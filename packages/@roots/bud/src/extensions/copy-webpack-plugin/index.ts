import {Framework, Module} from '@roots/bud-framework'
import CopyPlugin, {CopyPluginOptions} from 'copy-webpack-plugin'
import {sync} from 'globby'

declare module '@roots/bud-framework' {
  interface Framework {
    /**
     * ## assets  [💁 Fluent]
     *
     * Copy static assets during compilation.
     *
     * You may specify paths with a string literal or glob pattern.
     *
     * ### Usage
     *
     * **Copy src/images to dist/images**
     *
     * ```js
     * app.assets(['src/images'])
     * ```
     */
    assets: Assets
  }
}

type Assets = (from: string[]) => Framework

const extension: Module<CopyPlugin, CopyPluginOptions> = {
  name: 'copy-webpack-plugin',

  options: () => ({
    patterns: [],
    noErrorOnMissing: true,
  }),

  make: options => new CopyPlugin(options.all()),

  when(_app, options) {
    return (
      options.has('patterns') &&
      options.get('patterns')?.length > 0
    )
  },

  api: () => ({
    assets: function (jobs) {
      jobs.map(from => {
        sync(from).map((from: string) => {
          const dirName =
            from.split('/')[from.split('/').length - 2]

          const format = this.store.isTrue('hash')
            ? this.store.get('hashFormat')
            : this.store.get('fileFormat')

          const pattern = {
            from,
            to: `${dirName}/${format}.[ext]`,
          }

          this.extensions
            .get('copy-webpack-plugin')
            .set('options', (copy: CopyPluginOptions) => ({
              ...copy,
              patterns: [...(copy.patterns ?? []), pattern],
            }))
        })
      })

      return this
    },
  }),
}

export const {name, options, make, when, api} = extension
