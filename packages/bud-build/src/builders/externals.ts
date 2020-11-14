import {Bud, Container, Webpack} from '@roots/bud-typings'

type Externals = Webpack.Configuration['externals']
type Build = (
  this: Bud.App,
  config: Container,
) => {externals: Externals}

export const externals: Build = function (config) {
  return {
    externals: this.hooks.filter<Externals>(
      'webpack.externals',
      config.get('externals'),
    ),
  }
}
