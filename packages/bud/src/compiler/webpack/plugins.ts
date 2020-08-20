import {Bud} from './types'
import type {WebpackPlugins} from '@roots/bud-typings'

type PluginsBuilder = (bud: Bud) => WebpackPlugins

const plugins: PluginsBuilder = bud =>
  bud.hooks.filter('webpack.plugins', {
    plugins: bud.adapters
      .entries()
      .map(adapter =>
        bud.hooks.filter(
          `webpack.plugins.${adapter.name}`,
          bud.adapters.controller(bud).build(adapter),
        ),
      )
      .filter(adapter => adapter),
  })

export {plugins}
export type {PluginsBuilder}
