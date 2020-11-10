import {Build} from '@roots/bud-typings'

export const general: Framework.Build.General = function ({
  mode,
  node,
  stats,
  target,
  watch,
  context,
  devtool,
  performance,
}): Build.Configuration {
  return this.hooks.filter<Build.Configuration>('webpack', {
    mode: this.hooks.filter<Build.Configuration['mode']>(
      'webpack.mode',
      mode,
    ),

    node: this.hooks.filter<Build.Configuration['node']>(
      'webpack.node',
      node,
    ),

    stats: this.hooks.filter<Build.Configuration['stats']>(
      'webpack.stats',
      stats,
    ),

    target: this.hooks.filter<Build.Configuration['target']>(
      'webpack.target',
      target,
    ),

    watch: this.hooks.filter<Build.Configuration['watch']>(
      'webpack.watch',
      watch,
    ),

    context: this.hooks.filter<Build.Configuration['context']>(
      'webpack.context',
      context,
    ),

    performance: this.hooks.filter<
      Build.Configuration['performance']
    >('webpack.performance', performance),

    devtool: this.hooks.filter<Build.Configuration['devtool']>(
      'webpack.devtool',
      devtool,
    ),
  })
}
