import {Bud, WebpackPlugins} from '@roots/bud-typings'

type PluginsBuilder = (bud: Bud) => WebpackPlugins

const plugins: PluginsBuilder = bud =>
  bud.hooks.filter('webpack.plugins', {
    plugins: bud.plugins
      .entries()
      .reduce(
        (a, [name, fn]) => [
          ...a,
          bud.hooks.filter(
            `webpack.plugins.${name}`,
            bud.plugins.controller.use(fn).build(),
          ),
        ],
        [],
      )
      .filter(plugin => plugin),
  })

export {plugins}
export type {PluginsBuilder}
