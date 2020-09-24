import type {BudInterface} from '../'
import type {Configuration} from 'webpack'

export type ResolveBuilder = (
  bud: BudInterface,
) => Configuration['resolve']

export const webpackResolve: ResolveBuilder = bud =>
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
