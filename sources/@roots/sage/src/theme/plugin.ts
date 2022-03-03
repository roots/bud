import {fs} from '@roots/bud-support'
import {Compiler, WebpackPluginInstance} from 'webpack'

/**
 * Plugin options
 *
 * @public
 */
export interface Options {
  /**
   * JSON contents
   */
  json: string

  /**
   * Emit path
   */
  path: string
}

/**
 * ThemeJSONWebpackPlugin
 */
export class ThemeJsonWebpackPlugin implements WebpackPluginInstance {
  public constructor(public options: Options) {}

  public apply(compiler: Compiler) {
    compiler.hooks.done.tapPromise(this.constructor.name, async () => {
      try {
        await fs.writeFile(this.options.path, this.options.json, 'utf8')
      } catch (err) {
        throw new Error(err)
      }
    })
  }
}
