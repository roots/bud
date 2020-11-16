import {Bud, Container, Webpack} from '@roots/bud-typings'

type Cfg = Webpack.Configuration
type General = (
  this: Bud.Contract,
  config: Container,
) => Partial<Cfg>

export const general: General = function (config) {
  return this.hooks.filter<Cfg>('webpack', {
    bail: this.hooks.filter<Cfg['bail']>(
      'webpack.bail',
      config.get('bail'),
    ),

    context: this.hooks.filter<Cfg['context']>(
      'webpack.context',
      config.get('context'),
    ),

    devtool: this.hooks.filter<Cfg['devtool']>(
      'webpack.devtool',
      config.get('devtool'),
    ),

    mode: this.hooks.filter<Cfg['mode']>(
      'webpack.mode',
      config.get('mode'),
    ),

    name: this.hooks.filter<Cfg['name']>(
      'webpack.name',
      config.get('name'),
    ),

    node: this.hooks.filter<Cfg['node']>(
      'webpack.node',
      config.get('node'),
    ),

    performance: this.hooks.filter<Cfg['performance']>(
      'webpack.performance',
      config.get('performance'),
    ),

    recordsPath: this.hooks.filter<Cfg['recordsPath']>(
      'webpack.recordsPath',
      config.get('recordsPath'),
    ),

    stats: this.hooks.filter<Cfg['stats']>(
      'webpack.stats',
      config.get('stats'),
    ),

    target: this.hooks.filter<Cfg['target']>(
      'webpack.target',
      config.get('target'),
    ),

    watch: this.hooks.filter<Cfg['watch']>(
      'webpack.watch',
      config.get('watch'),
    ),
  })
}
