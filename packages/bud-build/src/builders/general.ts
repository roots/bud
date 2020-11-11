import {Build} from '@roots/bud-typings'

export const general: Framework.Build.General = function ({
  bail,
  context,
  devtool,
  mode,
  name,
  node,
  performance,
  recordsPath,
  stats,
  target,
  watch,
}): Build.Configuration {
  return this.hooks.filter<Build.Configuration>('webpack', {
    bail: this.hooks.filter<Build.Configuration['bail']>(
      'webpack.bail',
      bail,
    ),

    context: this.hooks.filter<Build.Configuration['context']>(
      'webpack.context',
      context,
    ),

    devtool: this.hooks.filter<Build.Configuration['devtool']>(
      'webpack.devtool',
      devtool,
    ),

    mode: this.hooks.filter<Build.Configuration['mode']>(
      'webpack.mode',
      mode,
    ),

    name: this.hooks.filter<Build.Configuration['name']>(
      'webpack.name',
      name,
    ),

    node: this.hooks.filter<Build.Configuration['node']>(
      'webpack.node',
      node,
    ),

    performance: this.hooks.filter<
      Build.Configuration['performance']
    >('webpack.performance', performance),

    recordsPath: this.hooks.filter<
      Build.Configuration['recordsPath']
    >('webpack.recordsPath', recordsPath),

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
  })
}
