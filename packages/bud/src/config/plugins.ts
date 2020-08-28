import {Bud} from './types'
import type {WebpackPlugins} from '@roots/bud-typings'

type PluginsBuilder = (bud: Bud) => WebpackPlugins

const plugins: PluginsBuilder = bud =>
  bud.hooks.filter('webpack.plugins', {
    plugins: Object.entries(bud.plugins.entries())
      .reduce(
        (a, [, fn]) => [
          ...(a ? a : []),
          typeof fn == 'function'
            ? bud.controller.use(fn).build()
            : null,
        ],
        [],
      )
      .filter(plugin => plugin),
  })

export {plugins}
export type {PluginsBuilder}
