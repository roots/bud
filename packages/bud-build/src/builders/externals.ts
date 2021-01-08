import {Framework, Webpack} from '@roots/bud-typings'

export type Externals = Webpack.Configuration['externals']
export namespace Externals {
  export type Build = (this: Framework) => {externals: Externals}
}

export const externals: Externals.Build = function () {
  return {
    externals: this.hooks.filter<Externals>(
      'webpack.externals',
      this.store.get('webpack.externals'),
    ),
  }
}
