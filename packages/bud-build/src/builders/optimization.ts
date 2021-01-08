import {Framework, Webpack} from '@roots/bud-typings'

export type Optimization = Webpack.Configuration['optimization']

export namespace Optimization {
  export type Build = (
    this: Framework,
  ) => {optimization: Optimization}
}

/**
 * Webpack.Optimization
 */
export const optimization: Optimization.Build = function () {
  const output: {optimization: Optimization} = {
    optimization: this.hooks.filter<Optimization>(
      `webpack.optimization`,
      this.store.get('webpack.optimization'),
    ),
  }

  if (this.store.enabled(`features.runtimeChunk`)) {
    output.optimization.runtimeChunk = this.hooks.filter<
      Optimization['runtimeChunk']
    >(
      `webpack.optimization.runtimeChunk`,
      this.store.get(`webpack.optimization.runtimeChunk`),
    )
  }

  if (this.store.enabled('features.vendor')) {
    output.optimization.splitChunks = this.hooks.filter<any>(
      `webpack.optimization.splitChunks`,
      this.store.get(`webpack.optimization.splitChunks`),
    )
  }

  return output
}
