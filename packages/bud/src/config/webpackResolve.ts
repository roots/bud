import {join} from 'path'
import type {Bud} from './types'
import type {WebpackResolve} from '@roots/bud-typings'

type ResolveBuilder = (bud: Bud) => WebpackResolve

const webpackResolve: ResolveBuilder = bud =>
  bud.hooks.filter('webpack.resolve', {
    resolve: {
      alias: bud.hooks.filter(
        'webpack.resolve.alias',
        bud.options.get('webpack.resolve.alias'),
      ),
      extensions: bud.hooks.filter(
        'webpack.resolve.extensions',
        bud.options.get('webpack.resolve.extensions'),
      ),
      modules: bud.hooks.filter('webpack.resolve.modules', [
        bud.paths.get('src'),
        join(bud.paths.get('project'), 'node_modules'),
        join(bud.paths.get('framework'), 'node_modules'),
      ]),
    },
  })

export {webpackResolve}
export type {ResolveBuilder}
