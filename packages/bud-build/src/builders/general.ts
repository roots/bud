import {Bud, Webpack} from '@roots/bud-typings'

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
  export type Build = (this: Bud.Contract) => Config
}

export const general: General.Build = function() {
  return this.hooks.filter<Config>('webpack', {
    bail: this.hooks.filter<Config['bail']>(
      'webpack.bail',
      this.config.get('bail'),
    ),

    context: this.hooks.filter<Config['context']>(
      'webpack.context',
      this.config.get('context'),
    ),

    devtool: this.hooks.filter<Config['devtool']>(
      'webpack.devtool',
      this.config.get('devtool'),
    ),

    mode: this.hooks.filter<Config['mode']>(
      'webpack.mode',
      this.config.get('mode'),
    ),

    name: this.hooks.filter<Config['name']>(
      'webpack.name',
      this.config.get('name'),
    ),

    node: this.hooks.filter<Config['node']>(
      'webpack.node',
      this.config.get('node'),
    ),

    performance: this.hooks.filter<Config['performance']>(
      'webpack.performance',
      this.config.get('performance'),
    ),

    recordsPath: this.hooks.filter<Config['recordsPath']>(
      'webpack.recordsPath',
      this.config.get('recordsPath'),
    ),

    stats: this.hooks.filter<Config['stats']>(
      'webpack.stats',
      this.config.get('stats'),
    ),

    target: this.hooks.filter<Config['target']>(
      'webpack.target',
      this.config.get('target'),
    ),

    watch: this.hooks.filter<Config['watch']>(
      'webpack.watch',
      this.config.get('watch'),
    ),
  })
}
