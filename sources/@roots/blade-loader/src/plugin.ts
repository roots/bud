import {bind} from 'helpful-decorators'
import type {Compiler, WebpackPluginInstance} from 'webpack'

interface Options {
  extractScripts?: boolean
}

export default class BladeWebpackPlugin implements WebpackPluginInstance {
  public constructor(public options?: Options) {}

  @bind
  public async apply(compiler: Compiler) {
    const use = [`@roots/blade-loader/asset-loader`]
    if (this.options?.extractScripts !== false) {
      use.unshift(`@roots/blade-loader/script-loader`)
    }

    compiler.hooks.afterEnvironment.tap(this.constructor.name, () => {
      compiler.options.module.rules.push({
        test: /\.php$/,
        use,
      })
    })
  }
}
