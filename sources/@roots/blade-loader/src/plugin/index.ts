import type {Compiler, WebpackPluginInstance} from 'webpack'

interface Options {
  extractScripts?: boolean
}

/**
 * Blade loader plugin
 */
export default class BladeWebpackPlugin implements WebpackPluginInstance {
  /**
   * Blade rules
   */
  public bladeRules = []

  /**
   * Plugin constructor
   */
  public constructor(public options?: Options) {}

  /**
   * {@link WebpackPluginInstance.apply}
   */
  public async apply(compiler: Compiler) {
    const use = [`@roots/blade-loader/asset-loader`]

    if (this.options?.extractScripts !== false) {
      use.unshift(`@roots/blade-loader/module-loader`)
    }

    compiler.hooks.afterEnvironment.tap(this.constructor.name, () => {
      compiler.options.module.rules.push({
        test: /\.php$/,
        use,
      })
    })
  }
}