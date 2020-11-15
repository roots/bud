import {Bud, Container, Webpack} from '@roots/bud-typings'

type Cfg = Webpack.Configuration['output']
type Output = (
  this: Bud.Contract,
  config: Container,
) => {output: Cfg}

export const output: Output = function (config) {
  const path = this.hooks.filter<Cfg['path']>(
    'webpack.output.path',
    config.get('output.path'),
  )

  const publicPath = this.hooks.filter<Cfg['publicPath']>(
    'webpack.output.publicPath',
    config.get('output.publicPath'),
  )

  const filename = this.hooks.filter<Cfg['filename']>(
    'webpack.output.filename',
    this.features.enabled('hash')
      ? `[name].[hash].js`
      : `[name].js`,
  )

  return {
    output: {
      path,
      publicPath,
      filename,
    },
  }
}
