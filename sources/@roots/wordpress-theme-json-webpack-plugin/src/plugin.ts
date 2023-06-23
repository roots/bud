import type * as Theme from '@roots/wordpress-theme-json-webpack-plugin/theme'
import type {Compiler, WebpackPluginInstance} from 'webpack'

import omit from 'lodash/omit.js'
import webpack from 'webpack'
import {relative} from 'path'

/**
 * Plugin options
 */
export interface Options {
  /**
   * Warning comment about the file being generated.
   */
  __generated__?: string

  /**
   * JSON schema URI for theme.json.
   */
  $schema?: string

  /**
   * WordPress `customTemplates`
   * @see https://developer.wordpress.org/block-editor/how-to-guides/themes/theme-json/
   */
  customTemplates?: Theme.SettingsAndStyles['customTemplates']

  /**
   * Emit path
   */
  path: string

  /**
   * An array of pattern slugs to be registered from the Pattern Directory.
   */
  patterns?: Theme.SettingsAndStyles['patterns']

  /**
   * WordPress `settings`
   * @see https://developer.wordpress.org/block-editor/how-to-guides/themes/theme-json/
   */
  settings?: Partial<Theme.SettingsAndStyles['settings']>

  /**
   * Organized way to set CSS properties. Styles in the top-level will be added in the `body` selector.
   */
  styles?: Theme.SettingsAndStyles['styles']

  /**
   * Additional metadata for template parts defined in the parts folder.
   */
  templateParts?: Theme.SettingsAndStyles['templateParts']

  /**
   * Version of theme.json to use.
   */
  version?: 2
}

/**
 * ThemeJSONWebpackPlugin
 */
export class ThemeJsonWebpackPlugin implements WebpackPluginInstance {
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
  public apply(compiler: Compiler) {
    const pluginName = this.constructor.name

    compiler.hooks.thisCompilation.tap(pluginName, compilation => {
      compilation.hooks.processAssets.tapPromise(
        {
          name: pluginName,
          stage: webpack.Compilation.PROCESS_ASSETS_STAGE_ADDITIONAL,
        },
        async () => {
          const cache = compilation.getCache(pluginName)

          let settings: Omit<Options, `path`> = await cache.getPromise<
            Omit<Options, `path`>
          >(`settings`, null)

          if (!settings) {
            settings = this.settings
            await cache.storePromise(`settings`, null, settings)
          }

          const source = new compiler.webpack.sources.RawSource(
            JSON.stringify(settings, null, 2),
          )
          compilation.emitAsset(
            relative(compilation.options.output.path, this.path),
            source,
          )
        },
      )
    })
  }

  /**
   * theme.json path
   */
  public get path(): string {
    return this.options.path
  }

  /**
   * theme.json settings
   */
  public get settings(): Omit<Options, `path`> {
    return Object.entries({
      __generated__: `⚠️ This file is generated. Do not edit.`,
      $schema: `https://schemas.wp.org/trunk/theme.json`,
      version: 2,
      ...omit(this.options, `path`),
    }).reduce((a, [k, v]) => {
      if (v !== undefined) {
        a[k] = v
      }
      return a
    }, {})
  }
}
