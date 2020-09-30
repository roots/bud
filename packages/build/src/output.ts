import Bud from '@roots/bud-types'

const output: Bud.Build.Output = function () {
  return this.hooks.filter('webpack.output', {
    output: {
      path: this.paths.get('dist'),
      publicPath: this.paths.get('public'),
      filename: this.features.enabled('hash')
        ? `[name].[hash].js`
        : `[name].js`,
    },
  })
}

export {output as default}
