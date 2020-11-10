import {Webpack} from '@roots/bud-typings'

export const general: Framework.Build.General = function ({
  mode,
  node,
  stats,
  target,
  watch,
  context,
  devtool,
  performance,
}) {
  return {
    mode: this.hooks.filter(
      'webpack.mode',
      mode,
    ) as Webpack.Configuration['mode'],

    node: this.hooks.filter(
      'webpack.node',
      node,
    ) as Webpack.Configuration['node'],

    stats: this.hooks.filter(
      'webpack.stats',
      stats,
    ) as Webpack.Configuration['stats'],

    target: this.hooks.filter(
      'webpack.target',
      target,
    ) as Webpack.Configuration['target'],

    watch: this.hooks.filter(
      'webpack.watch',
      watch,
    ) as Webpack.Configuration['watch'],

    context: this.hooks.filter(
      'webpack.context',
      context,
    ) as Webpack.Configuration['context'],

    performance: this.hooks.filter(
      'webpack.performance',
      performance ?? {},
    ) as Webpack.Configuration['performance'],

    devtool: this.hooks.filter(
      'webpack.devtool',
      devtool ?? false,
    ) as Webpack.Configuration['devtool'],
  }
}
