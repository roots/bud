import Bud from '../Bud'

const general: Bud.Build.General = function (webpack) {
  return {
    mode: this.hooks.filter('webpack.mode', webpack.mode),
    node: this.hooks.filter('webpack.node', webpack.node),
    stats: this.hooks.filter('webpack.stats', webpack.stats),
    target: this.hooks.filter('webpack.target', webpack.target),
    watch: this.hooks.filter('webpack.watch', webpack.watch),

    context: this.hooks.filter(
      'webpack.context',
      webpack.context,
    ),

    devtool: this.hooks.filter(
      'webpack.devtool',
      webpack.devtool ?? false,
    ),
  }
}

export {general as default}
