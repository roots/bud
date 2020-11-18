import {Bud, Webpack} from '@roots/bud-typings'

export type Externals = Webpack.Configuration['externals']
export namespace Externals {
  export type Build = (
    this: Bud.Contract,
  ) => {externals: Externals}
}

export const externals: Externals.Build = function() {
  return {
    externals: this.hooks.filter<Externals>(
      'webpack.externals',
      this.config.get('externals'),
    ),
  }
}
