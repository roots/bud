import Bud from '@roots/bud-types'

const plugins: Bud.Build.Plugins = function () {
  return this.hooks.filter('webpack.plugins', {
    plugins: this.plugins
      .entries()
      .reduce(
        (
          plugins: Bud.Build.Product.Plugins,
          [name, fn]: [string, Bud.Plugin.Factory],
        ) => [
          ...plugins,
          this.hooks.filter(
            `webpack.plugins.${name}`,
            this.makePluginController(fn).make(),
          ),
        ],
        [],
      )
      .filter(
        (plugin: Bud.Build.Configuration['plugins']) => plugin,
      ),
  })
}

export {plugins as default}
