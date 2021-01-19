import {Bud} from '../../..'
import {Configuration} from 'webpack'

declare type Value<T> = Configuration['optimization'][T &
  keyof Configuration['optimization']]

declare type Setting<T> = (app: Bud) => Value<T>

/**
 * Namespace util
 */
const ns = (setting: string): string =>
  `webpack.optimization.${setting}`

/**
 * webpack.optimization.namedModules
 */
export const namedModules: Setting<'namedModules'> = ({hooks}) =>
  hooks.filter(ns('namedModules'), true)

/**
 * webpack.optimization.noEmitOnErrors
 */
export const noEmitOnErrors: Setting<'noEmitOnErrors'> = ({
  hooks,
}) => hooks.filter(ns('noEmitOnErrors'), true)

/**
 * runtimeChunk
 *
 * @filter {webpack.optimization.runtimeChunk}
 * @flags  {--runtime}
 * @see    {bud.runtime}
 */
export const runtimeChunk: Setting<'runtimeChunk'> = ({hooks}) =>
  hooks.filter(ns('runtimeChunk'), {
    name: entrypoint => `runtime/${entrypoint.name}`,
  })

/**
 * splitChunks
 *
 * @filter {webpack.optimization.splitChunks}
 * @filter {webpack.optimization.splitChunks.vendor}
 * @flags  {--vendor}
 * @see    {bud.vendor}
 */
export const splitChunks: Setting<'splitChunks'> = ({
  hooks,
}: Bud) =>
  hooks.filter(ns('splitChunks'), {
    chunks: 'async',
    minSize: 20000,
    maxSize: 0,
    minChunks: 1,
    maxAsyncRequests: 30,
    maxInitialRequests: 30,
    cacheGroups: {
      vendor: hooks.filter(ns('splitChunks.vendor'), {
        enforce: true,
        priority: -10,
        test: /[\\/]node_modules[\\/]/,
        chunks: 'all',
        /**
         * Places in runtime/ dir
         */
        name(
          module: any,
          _chunks: any,
          cacheGroupKey: any,
        ): string {
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
        reuseExistingChunk: true,
      }),
    },
  })
