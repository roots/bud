import {Bud, Webpack} from '@roots/bud-typings'

export type Optimization = Webpack.Configuration['optimization']

export namespace Optimization {
  export type Build = (
    this: Bud.Contract,
  ) => {optimization: Optimization}
}

/**
 * Annoying to type because of the length of keys
 */
const key = val =>
  `webpack.optimization${val.map(
    v => `${val.length > 1 ? '.' : ''}${v}`,
  )}`

/**
 * Webpack.Optimization
 */
export const optimization: Optimization.Build = function () {
  const output = this.hooks.filter<{
    optimization: Optimization
  }>(key``, {
    optimization: {
      minimize: this.hooks.filter<Optimization['minimize']>(
        key`minimize`,
        this.features.enabled(`minify`),
      ),

      removeAvailableModules: this.hooks.filter<
        Optimization['removeAvailableModules']
      >(
        key`removeAvailableModules`,
        this.config.get('optimization.removeAvailableModules'),
      ),

      moduleIds: this.hooks.filter<Optimization['moduleIds']>(
        key`moduleIds`,
        this.config.get('optimization.moduleIds'),
      ),
    },
  })

  if (this.features.enabled(`runtimeChunk`)) {
    output.optimization.runtimeChunk = this.hooks.filter<
      Optimization['runtimeChunk']
    >(
      key`runtimeChunk`,
      this.config.get(`optimization.runtimeChunk`),
    )
  }

  if (this.features.enabled('vendor')) {
    output.optimization.splitChunks = this.hooks.filter<any>(
      key`splitChunks`,
      this.config.get(`optimization.splitChunks`),
    )
  }

  return output
}
