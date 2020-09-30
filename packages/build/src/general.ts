import Bud from '@roots/bud-types'

const general: Bud.Build.General = function (this: Bud) {
  return {
    context: this.hooks.filter(
      'webpack.context',
      this.store['paths'].get('src'),
    ),

    devtool: this.hooks.filter(
      'webpack.devtool',
      this.store['webpack'].get('devtool') ?? false,
    ),

    mode: this.hooks.filter('webpack.mode', this.mode.get()),

    node: this.hooks.filter(
      'webpack.node',
      this.store['webpack'].get('node'),
    ),

    stats: this.hooks.filter(
      'webpack.stats',
      this.store['webpack'].get('stats'),
    ),

    target: this.hooks.filter(
      'webpack.target',
      this.store['webpack'].get('target'),
    ),

    watch: this.hooks.filter(
      'webpack.watch',
      this.store['features'].enabled('watch'),
    ),
  }
}

export {general as default}
