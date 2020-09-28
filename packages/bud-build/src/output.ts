import Bud from '@roots/bud-types'

const output: Bud.Build.Output = function () {
  return this.hooks.filter('webpack.output', {
    output: {
      path: this.hooks.filter(
        'webpack.output.path',
        this.paths.get('dist'),
      ),

      publicPath: this.hooks.filter(
        'webpack.output.publicPath',
        this.paths.get('public'),
      ),

      filename: this.hooks.filter(
        'webpack.output.filename',
        this.features.enabled('hash')
          ? `${this.options.get('filenameTemplate').hashed}.js`
          : `${this.options.get('filenameTemplate').default}.js`,
      ),
    },
  })
}

export {output as default}
