import type {BudInterface} from '../'
import {WebpackPlugins} from '@roots/bud-types'

type PluginsBuilder = (bud: BudInterface) => WebpackPlugins

const plugins: PluginsBuilder = bud =>
  bud.hooks.filter('webpack.plugins', {
    plugins: bud.webpackPlugins
      .entries()
      .reduce(
        (
          a: any,
          [name, fn]: [string, (bud: BudInterface) => any],
        ) => [
          ...a,
          bud.hooks.filter(
            `webpack.plugins.${name}`,
            bud.makePluginController(fn).build(),
          ),
        ],
        [],
      )
      .filter((plugin: any) => plugin),
  })

export {plugins}
export type {PluginsBuilder}
