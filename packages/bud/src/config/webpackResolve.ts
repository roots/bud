import type {BudInterface} from '../'
import type {WebpackResolve} from '@roots/bud-types'

type ResolveBuilder = (bud: BudInterface) => WebpackResolve

const webpackResolve: ResolveBuilder = bud =>
  bud.hooks.filter('webpack.resolve', {
    resolve: {
      ...(bud.options.get('webpack.resolve.alias')
        ? {
            alias: bud.hooks.filter(
              'webpack.resolve.alias',
              bud.options.get('webpack.resolve.alias'),
            ),
          }
        : []),

      extensions: bud.hooks.filter(
        'webpack.resolve.extensions',
        [...bud.options.get('webpack.resolve.extensions')],
      ),

      modules: bud.hooks.filter('webpack.resolve.modules', [
        bud.fs.get('src'),
        'node_modules',
      ]),
    },
  })

export {webpackResolve}
export type {ResolveBuilder}
