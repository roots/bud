import type {BudInterface, PluginInterface} from '../'
import type {Configuration, Plugin} from 'webpack'

export type PluginsBuilder = (
  bud: BudInterface,
) => Configuration['plugins']

export const plugins: PluginsBuilder = (bud: BudInterface) =>
  bud.hooks.filter('webpack.plugins', {
    plugins: bud.webpackPlugins
      .entries()
      .reduce(
        (
          a: Configuration['plugins'],
          [name, fn]: [
            string,
            (bud: BudInterface) => PluginInterface,
          ],
        ) => [
          ...a,
          bud.hooks.filter(
            `webpack.plugins.${name}`,
            bud.makePluginController(fn).build(),
          ),
        ],
        [],
      )
      .filter((plugin: Plugin) => plugin),
  })
