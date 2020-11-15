import {Bud, Container, Webpack} from '@roots/bud-typings'

type Entry = Webpack.Configuration['entry']
type Build = (
  this: Bud.Contract,
  config: Container,
) => {entry: Entry}

export const entry: Build = function (config) {
  return {
    entry: this.hooks.filter<Entry>(
      'webpack.entry',
      config.get('entry'),
    ),
  }
}
