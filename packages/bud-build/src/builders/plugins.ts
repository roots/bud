import {Extension, Webpack, Bud} from '@roots/bud-typings'

export namespace Plugins {
  export type Build = (
    this: Bud.Contract,
  ) => {plugins: Webpack.Configuration['plugins']}
}

export const plugins: Plugins.Build = function () {
  const plugins: Webpack.Plugin[] = this.hooks.filter<
    Webpack.Configuration['plugins']
  >(
    'webpack.plugins',
    this.extensions
      .getStore()
      .getEntries()
      .map(
        ([name, ext]: [
          string,
          Extension.Controller,
        ]): Webpack.Plugin =>
          this.hooks.filter<Webpack.Plugin>(
            `webpack.plugins.${name}`,
            ext.makePlugin ? ext.makePlugin() : null,
          ),
      )
      .filter((ext: Webpack.Plugin | null) => ext),
  )

  return {
    plugins,
  }
}
