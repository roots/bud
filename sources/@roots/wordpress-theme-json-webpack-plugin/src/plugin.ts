import type * as Theme from '@roots/wordpress-theme-json-webpack-plugin/theme'
import fs from 'fs-jetpack'
import {bind} from 'helpful-decorators'
import omit from 'lodash/omit.js'
import type {Compiler, WebpackPluginInstance} from 'webpack'

/**
 * Plugin options
 */
export interface Options {
  /**
   * WordPress `settings`
   * @see https://developer.wordpress.org/block-editor/how-to-guides/themes/theme-json/
   */
  settings?: Partial<Theme.GlobalSettingsAndStyles['settings']>

  /**
   * WordPress `customTemplates`
   * @see https://developer.wordpress.org/block-editor/how-to-guides/themes/theme-json/
   */
  customTemplates?: Theme.GlobalSettingsAndStyles['customTemplates']

  /**
   * Emit path
   */
  path: string
}

/**
 * ThemeJSONWebpackPlugin
 */
export class ThemeJsonWebpackPlugin implements WebpackPluginInstance {
  /**
   * theme.json path
   */
  public get path(): string {
    return this.options.path
  }

  /**
   * theme.json settings
   */
  public get settings(): string {
    return JSON.stringify(
      {
        __generated__: `⚠️ This file is generated. Do not edit.`,
        $schema: `https://schemas.wp.org/trunk/theme.json`,
        version: 2,
        ...omit(this.options, `path`),
      },
      null,
      2,
    )
  }

  /**
   * Class constructor
   *
   * @param options - Plugin options
   */
  public constructor(public options: Options) {}

  /**
   * Apply plugin
   *
   * @param compiler - Webpack compiler
   * @returns void
   */
  @bind
  public apply(compiler: Compiler) {
    compiler.hooks.done.tapPromise(this.constructor.name, this.done)
  }

  /**
   * Compiler done callback
   *
   * @returns Promise
   */
  @bind
  public async done() {
    try {
      await fs.writeAsync(this.path, this.settings)
    } catch (err) {
      throw new Error(err)
    }
  }
}
