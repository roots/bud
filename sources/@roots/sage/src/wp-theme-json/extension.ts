import {Extension} from '@roots/bud-framework'
import {
  bind,
  expose,
  label,
  options,
  plugin,
  when,
} from '@roots/bud-framework/extension/decorators'
import type {GlobalSettingsAndStyles as WPThemeJson} from '@roots/bud-preset-wordpress/theme'
import {
  isBoolean,
  isFunction,
  isUndefined,
} from '@roots/bud-support/lodash-es'
import Container from '@roots/container'

import {Options, ThemeJsonWebpackPlugin} from './plugin.js'
import * as tailwind from './tailwind/index.js'

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
@label(`@roots/sage/wp-theme-json`)
@options({
  path: ({path}) => path(`./theme.json`),
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
      units: [`px`, `%`, `em`, `rem`, `vw`, `vh`],
    },
    typography: {
      customFontSize: false,
      dropCap: false,
    },
  },
})
@when(async () => false)
@plugin(ThemeJsonWebpackPlugin)
@expose(`wpjson`)
export default class ThemeJson extends Extension<
  Options,
  ThemeJsonWebpackPlugin
> {
  protected _palette: tailwind.palette.TailwindColors
  protected get palette() {
    return this._palette
  }
  protected set palette(palette) {
    this._palette = palette
  }
  protected _fontFamily: tailwind.fontFamily.TailwindFonts
  protected get fontFamily() {
    return this._fontFamily
  }
  protected set fontFamily(fontFamily) {
    this._fontFamily = fontFamily
  }

  protected _fontSize: tailwind.fontSize.TailwindSize
  protected get fontSize() {
    return this._fontSize
  }
  protected set fontSize(fontSize) {
    this._fontSize = fontSize
  }

  protected _template: Array<{name; title; postTypes}>
  protected get template() {
    return this._template
  }
  protected set template(template) {
    this._template = template
  }

  public resolveConfig: typeof import('tailwindcss/resolveConfig.js')
  public pluginUtils: typeof import('tailwindcss/lib/util/pluginUtils.js')
  public defaultConfig: typeof import('tailwindcss/defaultConfig.js')
  public tailwindConfig: ReturnType<typeof this.resolveConfig>

  @bind
  public resolveTailwindConfigValue<
    K extends `${keyof tailwind.ThemeConfig & string}`,
  >(key: K): typeof this.tailwindConfig {
    const rawValue = this.tailwindConfig?.theme?.[key]
    return isFunction(rawValue) ? rawValue(this.pluginUtils) : rawValue
  }

  @bind
  public settings(
    input?:
      | Mutator
      | Container<Partial<WPThemeJson['settings']>>
      | Partial<WPThemeJson['settings']>
      | boolean,
    raw?: boolean,
  ): this {
    if (!input) return this

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
      `settings`,
      value instanceof Container ? value.all() : value,
    )

    return this
  }

  @bind
  public async init() {
    const userTailwindConfig =
      this.app.context.config[`tailwind.config.js`] ??
      this.app.context.config[`tailwind.config.mjs`] ??
      this.app.context.config[`tailwind.config.cjs`]

    if (
      !userTailwindConfig &&
      !this.app.extensions.has(`@roots/bud-tailwindcss`)
    )
      return

    try {
      this.resolveConfig = await this.import(
        `tailwindcss/resolveConfig.js`,
      )
      this.pluginUtils = await this.import(
        `tailwindcss/lib/util/pluginUtils.js`,
      )
      this.defaultConfig = await this.import(
        `tailwindcss/defaultConfig.js`,
      )

      if (
        [this.resolveConfig, this.pluginUtils, this.defaultConfig].some(
          value => isUndefined(value),
        )
      )
        return

      Object.assign(
        this.tailwindConfig,
        userTailwindConfig
          ? this.resolveConfig(userTailwindConfig.module)
          : this.resolveConfig(this.defaultConfig),
      )

      Object.assign(
        this.palette,
        this.resolveTailwindConfigValue(`colors`),
      )
      Object.assign(
        this.fontSize,
        this.resolveTailwindConfigValue(`fontSize`),
      )
      Object.assign(
        this.fontFamily,
        this.resolveTailwindConfigValue(`fontFamily`),
      )
    } catch (error) {}
  }

  @bind
  public useTailwindColors(): this {
    this.setOption(`settings`, {
      ...(this.options.settings ?? {}),
      color: {
        ...(this.options.settings?.color ?? {}),
        palette: tailwind.palette.transform(this.palette),
      },
    })

    return this
  }

  @bind
  public useTailwindFontFamily(): this {
    this.setOption(`settings`, {
      ...(this.options.settings ?? {}),
      typography: {
        ...(this.options.settings?.typography ?? {}),
        fontFamilies: tailwind.fontFamily.transform(this.fontFamily),
      },
    })

    return this
  }

  @bind
  public useTailwindFontSize(): this {
    this.setOption(`settings`, {
      ...(this.options.settings ?? {}),
      typography: {
        ...(this.options.settings?.typography ?? {}),
        fontSizes: tailwind.fontSize.transform(this.fontSize),
      },
    })

    return this
  }
}
