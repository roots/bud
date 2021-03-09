import {Framework} from '@roots/bud-typings'
import {Configuration} from 'webpack'

declare type Value<T> = Configuration['optimization'][T &
  keyof Configuration['optimization']]

declare type Setting<T> = (app: Framework) => Value<T>

/**
 * Namespace util
 */
const ns = (setting: string): string =>
  `webpack.optimization.${setting}`

/**
 * webpack.optimization.namedModules
 */
export const namedModules: Setting<'namedModules'> = ({
  hooks,
  store,
}) =>
  hooks.filter(
    ns('namedModules'),
    store.get('options.namedModules'),
  )

/**
 * webpack.optimization.noEmitOnErrors
 */
export const noEmitOnErrors: Setting<'noEmitOnErrors'> = ({
  hooks,
  store,
}) =>
  hooks.filter(
    ns('noEmitOnErrors'),
    store.get('options.noEmitOnErrors') ?? false,
  )

/**
 * runtimeChunk
 *
 * @filter {webpack.optimization.runtimeChunk}
 * @flags  {--runtime}
 * @see    {bud.runtime}
 */
export const runtimeChunk: Setting<'runtimeChunk'> = ({
  hooks,
  store,
}) =>
  hooks.filter(ns('runtimeChunk'), {
    name: store.get('options.runtimeChunk.name'),
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
  store,
}: Framework) => {
  const splitChunks = store.get('options.splitChunks')
  delete splitChunks.enabled

  return hooks.filter(ns('splitChunks'), {
    ...splitChunks,
    cacheGroups: hooks.filter(ns('splitChunks.cacheGroups'), {
      vendor: hooks.filter(
        ns('splitChunks.cacheGroups.vendor'),
        {
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
        },
      ),
    }),
  })
}
