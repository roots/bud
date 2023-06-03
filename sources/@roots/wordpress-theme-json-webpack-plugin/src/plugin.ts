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
   * Emit path
   */
  path: string

  /**
   * Warning comment about the file being generated.
   */
  __generated__?: string

  /**
   * JSON schema URI for theme.json.
   */
  $schema?: string

  /**
   * WordPress `settings`
   * @see https://developer.wordpress.org/block-editor/how-to-guides/themes/theme-json/
   */
  settings?: Partial<Theme.SettingsAndStyles['settings']>

  /**
   * WordPress `customTemplates`
   * @see https://developer.wordpress.org/block-editor/how-to-guides/themes/theme-json/
   */
  customTemplates?: Theme.SettingsAndStyles['customTemplates']

  /**
   * Version of theme.json to use.
   */
  version?: 2

  /**
   * Organized way to set CSS properties. Styles in the top-level will be added in the `body` selector.
   */
  styles?: Theme.SettingsAndStyles['styles']

  /**
   * Additional metadata for template parts defined in the parts folder.
   */
  templateParts?: Theme.SettingsAndStyles['templateParts']

  /**
   * An array of pattern slugs to be registered from the Pattern Directory.
   */
  patterns?: Theme.SettingsAndStyles['patterns']
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
      Object.entries({
        __generated__: `⚠️ This file is generated. Do not edit.`,
        $schema: `https://schemas.wp.org/trunk/theme.json`,
        version: 2,
        ...omit(this.options, `path`),
      }).reduce((a, [k, v]) => {
        if (v !== undefined) {
          a[k] = v
        }
        return a
      }, {}),
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
