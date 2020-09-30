import Bud from '@roots/bud-types'

const plugins: Bud.Build.Plugins = function (this: Bud) {
  return this.hooks.filter('webpack.plugins', {
    plugins: this.plugins.make(),
  })
}

export {plugins as default}
