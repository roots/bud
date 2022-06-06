import {Bud, Extension} from '@roots/bud-framework'
import {
  bind,
  label,
  options,
  plugin,
  when,
} from '@roots/bud-framework/extension/decorators'
import type {GlobalSettingsAndStyles as WPThemeJson} from '@roots/bud-preset-wordpress/theme'
import Container from '@roots/container'
import {isBoolean, isFunction} from 'lodash-es'

import {Options, ThemeJsonWebpackPlugin} from './plugin.js'
import * as tailwind from './tailwind.js'

/**
 * Callback function used to configure wordpress `theme.json`
 *
 * @public
 */
export interface Mutator {
  (
    json:
      | Partial<WPThemeJson['settings']>
      | Container<Partial<WPThemeJson['settings']>>,
  ):
    | Partial<WPThemeJson['settings']>
    | Container<Partial<WPThemeJson['settings']>>
}

/**
 * WP Theme JSON plugin adapter
 *
 * @remarks
 * Produces a WordPress `theme.json`
 *
 * @example
 * ```ts
 * bud.themeJson(theme =>
 *   theme.set('color', {})
 * )
 * ```
 *
 * @public
 * @decorator `@label`
 * @decorator `@options`
 * @decorator `@when`
 * @decorator `@plugin`
 */
@label('wp-theme-json')
@options({
  path: app => app.path('./theme.json'),
  settings: {
    color: {
      custom: false,
      customGradient: false,
    },
    custom: {
      spacing: {},
      typography: {'font-size': {}, 'line-height': {}},
    },
    spacing: {
      padding: true,
      units: ['px', '%', 'em', 'rem', 'vw', 'vh'],
    },
    typography: {
      customFontSize: false,
      dropCap: false,
    },
  },
})
@when(async () => false)
@plugin(ThemeJsonWebpackPlugin)
export default class ThemeJson extends Extension<
  Options,
  ThemeJsonWebpackPlugin
> {
  protected static tailwind = tailwind

  protected _palette: tailwind.TailwindColors
  protected get palette() {
    return this._palette
  }
  protected set palette(palette) {
    this._palette = palette
  }

  @bind
  public async init() {
    const config =
      this.app.context.disk.config['tailwind.config.js'] ??
      this.app.context.disk.config['tailwind.config.mjs'] ??
      this.app.context.disk.config['tailwind.config.cjs']

    if (!config) return

    try {
      this.palette = await ThemeJson.tailwind.getPalette(config)
    } catch (error) {}
  }

  @bind
  public async register() {
    this.app.api.bindFacade('themeJson', this.themeJson)
    this.app.api.bindFacade('useTailwindColors', this.useTailwindColors)
  }

  @bind
  public themeJson(
    input?:
      | Mutator
      | Container<Partial<WPThemeJson['settings']>>
      | Partial<WPThemeJson['settings']>
      | boolean,
    raw?: boolean,
  ): Bud {
    if (!input) return this.app

    this.when = async () => true

    const value = isFunction(input)
      ? input(
          raw
            ? this.options.settings
            : this.app.container(this.options.settings),
        )
      : isBoolean(input)
      ? this.options.settings
      : input

    this.setOption(
      'settings',
      value instanceof Container ? value.all() : value,
    )

    return this.app
  }

  @bind
  public useTailwindColors(): Bud {
    this.setOption('settings', {
      ...(this.options.settings ?? {}),
      color: {
        ...(this.options.settings?.color ?? {}),
        palette: ThemeJson.tailwind.transformPalette(this.palette),
      },
    })

    return this.app
  }
}
