import {Framework} from '@roots/bud-framework'
import type Webpack from 'webpack'
import {merge} from 'lodash'

declare module '@roots/bud-framework' {
  interface Framework {
    /**
     * ## splitChunks  [💁 Fluent]
     *
     * Useful for bundling vendor modules separately from application code.
     *
     * ### Usage
     *
     * ```js
     * bud.splitChunks({
     *  chunks: 'all',
     * })
     * ```
     */
    splitChunks: Framework.Api.SplitChunks
  }

  namespace Framework.Api {
    export {SplitChunks}
  }
}

type SplitChunks = (options?: SplitChunks.Options) => Framework

namespace SplitChunks {
  export type Options = Webpack.Configuration['optimization']['splitChunks']
}

const DEFAULT_OPTIONS: Framework.Api.SplitChunks.Options = {
  hidePathInfo: true,
  chunks: 'async',
  minSize: 30000,
  minChunks: 1,
  maxAsyncRequests: 5,
  automaticNameDelimiter: '~',
  maxInitialRequests: 3,
  cacheGroups: {
    vendor: {
      chunks: 'all',
      enforce: true,
      test: /[\\/]node_modules[\\/]/,
      reuseExistingChunk: true,
      priority: -10,
      name: function (
        module: any,
        _chunks: any,
        cacheGroupKey: any,
      ) {
        const moduleFileNameParts = module
          .identifier()
          .split('/')
          .reduceRight(item => item)
          .split('.')

        const file = moduleFileNameParts
          .slice(0, moduleFileNameParts.length - 1)
          .join('.')

        return `${cacheGroupKey}/${file}`
      },
    },
  },
}

/**
 * @function splitChunks
 * @hook build/optimization/splitChunks
 */
export const splitChunks: Framework.Api.SplitChunks = function (
  options,
) {
  options = merge(DEFAULT_OPTIONS, options)

  this.hooks.on(
    'build/optimization/splitChunks',
    (): Webpack.Configuration['optimization']['splitChunks'] =>
      options,
  )

  return this
}
