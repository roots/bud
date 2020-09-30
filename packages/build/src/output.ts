import Bud from '@roots/bud-types'

const output: Bud.Build.Output = function () {
  return this.hooks.filter('webpack.output', {
    output: {
      path: this.store['paths'].get('dist'),
      publicPath: this.store['paths'].get('public'),
      filename: this.store['features'].enabled('hash')
        ? `[name].[hash].js`
        : `[name].js`,
    },
  })
}

export {output as default}
