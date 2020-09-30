import Bud from '@roots/bud-types'

const plugins: Bud.Build.Plugins = function () {
  return this.hooks.filter('webpack.plugins', {
    plugins: this.webpack.plugins.make(),
  })
}

export {plugins as default}
