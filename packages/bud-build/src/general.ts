import Bud from '@roots/bud-types'

const general: Bud.Build.General = function (this: Bud) {
  return {
    context: this.hooks.filter(
      'webpack.context',
      this.paths.get('src'),
    ),

    devtool: this.hooks.filter(
      'webpack.devtool',
      this.options.get('webpack.devtool') ?? false,
    ),

    mode: this.hooks.filter('webpack.mode', this.mode.get()),

    node: this.hooks.filter(
      'webpack.node',
      this.options.get('webpack.node'),
    ),

    stats: this.hooks.filter(
      'webpack.stats',
      this.options.get('webpack.stats'),
    ),

    target: this.hooks.filter(
      'webpack.target',
      this.options.get('webpack.target'),
    ),

    watch: this.hooks.filter(
      'webpack.watch',
      this.features.enabled('watch'),
    ),
  }
}

export {general as default}
