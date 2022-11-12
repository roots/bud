import type * as ThemeJSON from '@roots/bud-preset-wordpress/theme'
import {bind} from '@roots/bud-support/decorators'
import * as fs from '@roots/bud-support/fs'
import {omit} from '@roots/bud-support/lodash-es'
import type {
  Compiler,
  WebpackPluginInstance,
} from '@roots/bud-support/webpack'

/**
 * Plugin options
 *
 * @public
 */
export interface Options {
  /**
   * WordPress `settings`
   *
   * @public
   */
  settings?: Partial<ThemeJSON.GlobalSettingsAndStyles['settings']>

  /**
   * WordPress `customTemplates`
   *
   * @public
   */
  customTemplates?: ThemeJSON.GlobalSettingsAndStyles['customTemplates']

  /**
   * Emit path
   *
   * @public
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
      await fs.writeFile(this.path, this.settings, `utf8`)
    } catch (err) {
      throw new Error(err)
    }
  }
}
