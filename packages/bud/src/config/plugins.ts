import {Bud} from './types'
import type {WebpackPlugins} from '@roots/bud-typings'

type PluginsBuilder = (bud: Bud) => WebpackPlugins

const plugins: PluginsBuilder = bud =>
  bud.hooks.filter('webpack.plugins', {
    plugins: bud.plugins
      .entries()
      .map(adapter =>
        bud.hooks.filter(
          `webpack.plugins.${adapter.name}`,
          bud.extensions(bud, adapter).build(),
        ),
      )
      .filter(adapter => adapter),
  })

export {plugins}
export type {PluginsBuilder}
