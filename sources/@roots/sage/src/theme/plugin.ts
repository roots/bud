import * as ThemeJSON from '@roots/bud-preset-wordpress/types/theme'
import {bind, fs} from '@roots/bud-support'
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
  settings: ThemeJSON.JSONSchemaForWordPressBlockThemeGlobalSettingsAndStyles['settings']

  /**
   * Emit path
   */
  path: string
}

/**
 * ThemeJSONWebpackPlugin
 *
 * @public
 */
export class ThemeJsonWebpackPlugin implements WebpackPluginInstance {
  /**
   * theme.json path
   *
   * @public
   */
  public get path(): string {
    return this.options.path
  }

  /**
   * theme.json settings
   *
   * @public
   */
  public get settings(): string {
    return JSON.stringify(
      {
        __generated__: '⚠️ This file is generated. Do not edit.',
        $schema: 'https://schemas.wp.org/trunk/theme.json',
        version: 2,
        settings: this.options.settings,
      },
      null,
      2,
    )
  }

  /**
   * Class constructor
   *
   * @param options - Plugin options
   *
   * @public
   */
  public constructor(public options: Options) {}

  /**
   * Apply plugin
   *
   * @param compiler - Webpack compiler
   * @returns void
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public apply(compiler: Compiler) {
    compiler.hooks.done.tapPromise(this.constructor.name, this.done)
  }

  /**
   * Compiler done
   *
   * @returns Promise
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public async done() {
    try {
      await fs.writeFile(this.path, this.settings, 'utf8')
    } catch (err) {
      throw new Error(err)
    }
  }
}
