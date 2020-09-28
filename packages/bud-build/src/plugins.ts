import Bud from '@roots/bud-types'

const plugins: Bud.Build.Plugins = bud =>
  bud.hooks.filter('webpack.plugins', {
    plugins: bud.plugins
      .entries()
      .reduce(
        (
          plugins: Bud.Build.Product.Plugins,
          [name, fn]: [string, Bud.Plugin.Factory],
        ) => [
          ...plugins,
          bud.hooks.filter(
            `webpack.plugins.${name}`,
            bud.makePluginController(fn).make(),
          ),
        ],
        [],
      )
      .filter(
        (plugin: Bud.Build.Configuration['plugins']) => plugin,
      ),
  })

export {plugins as default}
