import {Framework, Webpack} from '@roots/bud-typings'

type Config = Omit<
  Webpack.Configuration,
  | 'entry'
  | 'externals'
  | 'module'
  | 'resolve'
  | 'optimization'
  | 'plugins'
  | 'output'
  | 'string'
>

export namespace General {
  export type Build = (this: Framework) => Config
}

export const general: General.Build = function () {
  return this.hooks.filter<Config>('webpack', {
    bail: this.hooks.filter<Config['bail']>(
      'webpack.bail',
      this.store.get('webpack.bail'),
    ),

    context: this.hooks.filter<Config['context']>(
      'webpack.context',
      this.store.get('webpack.context'),
    ),

    devtool: this.hooks.filter<Config['devtool']>(
      'webpack.devtool',
      this.store.get('webpack.devtool'),
    ),

    mode: this.hooks.filter<Config['mode']>(
      'webpack.mode',
      this.store.get('webpack.mode'),
    ),

    name: this.hooks.filter<Config['name']>(
      'webpack.name',
      this.store.get('webpack.name'),
    ),

    node: this.hooks.filter<Config['node']>(
      'webpack.node',
      this.store.get('webpack.node'),
    ),

    performance: this.hooks.filter<Config['performance']>(
      'webpack.performance',
      this.store.get('webpack.performance'),
    ),

    recordsPath: this.hooks.filter<Config['recordsPath']>(
      'webpack.recordsPath',
      this.store.get('webpack.recordsPath'),
    ),

    stats: this.hooks.filter<Config['stats']>(
      'webpack.stats',
      this.store.get('webpack.stats'),
    ),

    target: this.hooks.filter<Config['target']>(
      'webpack.target',
      this.store.get('webpack.target'),
    ),

    watch: this.hooks.filter<Config['watch']>(
      'webpack.watch',
      this.store.get('webpack.watch'),
    ),
  })
}
