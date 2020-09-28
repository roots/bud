import Bud from '@roots/bud-types'

const output: Bud.Build.Output = bud =>
  bud.hooks.filter('webpack.output', {
    output: {
      path: bud.hooks.filter(
        'webpack.output.path',
        bud.paths.get('dist'),
      ),

      publicPath: bud.hooks.filter(
        'webpack.output.publicPath',
        bud.paths.get('public'),
      ),

      filename: bud.hooks.filter(
        'webpack.output.filename',
        bud.features.enabled('hash')
          ? `${bud.options.get('filenameTemplate').hashed}.js`
          : `${bud.options.get('filenameTemplate').default}.js`,
      ),
    },
  })

export {output as default}
