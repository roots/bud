import type {Options} from '@roots/wordpress-theme-json-webpack-plugin'

import {
  DynamicOption,
  Extension,
  type OptionGetter,
  type OptionSetter,
} from '@roots/bud-framework/extension'
import {
  bind,
  disabled,
  expose,
  label,
  options,
  plugin,
} from '@roots/bud-framework/extension/decorators'
import isBoolean from '@roots/bud-support/isBoolean'
import isFunction from '@roots/bud-support/isFunction'
import Container from '@roots/container'
import ThemeJsonWebpackPlugin from '@roots/wordpress-theme-json-webpack-plugin'

/**
 * Callback function used to configure wordpress `theme.json`
 */
interface Mutator {
  (
    json: Container<Partial<Options['settings']>>,
  ): Container<Partial<Options['settings']>>
  (json: Partial<Options['settings']>): Partial<Options['settings']>
}

/**
 * WordPress theme.json configuration
 *
 * @example
 * ```ts
 * bud.themeJson(theme =>
 *   theme.set('color', {})
 * )
 * ```
 */
@label(`@roots/bud-wordpress-theme-json`)
@options<Options>({
  __generated__: `⚠️ This file is generated. Do not edit.`,
  customTemplates: undefined,
  path: DynamicOption.make(({path}) => path(`./theme.json`)),
  patterns: undefined,
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
  styles: undefined,
  templateParts: undefined,
  title: undefined,
  version: undefined,
})
@plugin(ThemeJsonWebpackPlugin)
@expose(`wpjson`)
@disabled
class WordPressThemeJson extends Extension<
  Options,
  ThemeJsonWebpackPlugin
> {
  public declare customTemplates: Options['customTemplates']
  public declare getCustomTemplates: OptionGetter<
    Options,
    `customTemplates`
  >
  public declare setCustomTemplates: OptionSetter<
    WordPressThemeJson,
    Options,
    `customTemplates`
  >

  public declare readonly __generated__: Options[`__generated__`]
  public declare get__generated__: OptionGetter<Options, `__generated__`>
  public declare set__generated__: OptionSetter<
    WordPressThemeJson,
    Options,
    `__generated__`
  >

  public declare readonly path: Options['path']
  public declare getPath: OptionGetter<Options, `path`>
  public declare setPath: OptionSetter<WordPressThemeJson, Options, `path`>

  public declare readonly patterns: Options['patterns']
  public declare getPatterns: OptionGetter<Options, `patterns`>
  public declare setPatterns: OptionSetter<
    WordPressThemeJson,
    Options,
    `patterns`
  >

  public declare getSettings: OptionGetter<Options, `settings`>
  public declare setSettings: OptionSetter<
    WordPressThemeJson,
    Options,
    `settings`
  >

  public declare readonly styles: Options['styles']
  public declare getStyles: OptionGetter<Options, `styles`>
  public declare setStyles: OptionSetter<
    WordPressThemeJson,
    Options,
    `styles`
  >

  public declare readonly title: Options['title']
  public declare getTitle: OptionGetter<Options, `title`>
  public declare setTitle: OptionSetter<
    WordPressThemeJson,
    Options,
    `title`
  >

  public declare readonly version: Options['version']
  public declare getVersion: OptionGetter<Options, `version`>
  public declare setVersion: OptionSetter<
    WordPressThemeJson,
    Options,
    `version`
  >

  public declare readonly templateParts: Options['templateParts']
  public declare getTemplateParts: OptionGetter<Options, `templateParts`>
  public declare setTemplateParts: OptionSetter<
    WordPressThemeJson,
    Options,
    `templateParts`
  >

  /**
   * ## bud.wp.json.useTailwindColors
   *
   * Source settings.color.palette values from tailwind config
   *
   * Requires {@link https://bud.js.org/extensions/bud-tailwindcss/ @roots/bud-tailwindcss} to be installed.
   *
   * @example
   * ```ts
   * bud.wpjson.useTailwindColors()
   * bud.wpjson.useTailwindColors(true)
   * ```
   *
   * @example
   * Limit to `theme.extend.colors` values
   *
   * ```ts
   * bud.wpjson.useTailwindColors(`extend`)
   * ```
   *
   * @example
   * Do not source values from tailwind config
   *
   * ```ts
   * bud.wpjson.useTailwindColors(false)
   * ```
   */
  public declare useTailwindColors?: (
    value?: `extend` | boolean,
  ) => WordPressThemeJson

  /**
   * ## bud.wp.json.useTailwindFontFamily
   *
   * Source settings.typography.fontFamilies values from tailwind config
   *
   * Requires {@link https://bud.js.org/extensions/bud-tailwindcss/ @roots/bud-tailwindcss} to be installed.
   *
   * @example
   * ```ts
   * bud.wpjson.useTailwindFontFamily()
   * bud.wpjson.useTailwindFontFamily(true)
   * ```
   *
   * @example
   * Limit to `theme.extend.fontFamily` values
   *
   * ```ts
   * bud.wpjson.useTailwindFontFamily(`extend`)
   * ```
   *
   * @example
   * Do not source values from tailwind config
   *
   * ```ts
   * bud.wpjson.useTailwindFontFamily(false)
   * ```
   */
  public declare useTailwindFontFamily?: (
    value?: `extend` | boolean,
  ) => WordPressThemeJson

  /**
   * ## bud.wp.json.useTailwindFontSize
   *
   * Source settings.typography.fontSizes values from tailwind config
   *
   * Requires {@link https://bud.js.org/extensions/bud-tailwindcss/ @roots/bud-tailwindcss} to be installed.
   *
   * @example
   * ```ts
   * bud.wpjson.useTailwindFontSize()
   * bud.wpjson.useTailwindFontSize(true)
   * ```
   *
   * @example
   * Limit to `theme.extend.fontSize` values
   *
   * ```ts
   * bud.wpjson.useTailwindFontSize(`extend`)
   * ```
   *
   * @example
   * Do not source values from tailwind config
   *
   * ```ts
   * bud.wpjson.useTailwindFontSize(false)
   * ```
   */

  public declare useTailwindFontSize?: (
    value?: `extend` | boolean,
  ) => WordPressThemeJson

  /**
   * ## bud.wp.json.useTailwindSpacing
   *
   * Source `theme.json` spacing values from `tailwind.config.js`
   *
   *
   * Requires {@link https://bud.js.org/extensions/bud-tailwindcss/ @roots/bud-tailwindcss} to be installed.
   *
   * @example
   * ```ts
   * bud.wpjson.useTailwindFontFamily()
   * ```
   *
   * @example
   * Source theme.fontFamily values but limit to `extend` values
   *
   * ```ts
   * bud.wpjson.useTailwindFontFamily(`extend`)
   * ```
   *
   * @example
   * Do not source theme.fontFamily values from tailwind.config.js
   *
   * ```ts
   * bud.wpjson.useTailwindFontFamily(false)
   * ```
   */
  public declare useTailwindSpacing?: (
    value?: `extend` | boolean,
  ) => WordPressThemeJson

  @bind
  public settings(
    input:
      | boolean
      | Container<Partial<Options['settings']>>
      | Mutator
      | Partial<Options['settings']>,
    raw?: boolean,
  ): this {
    if (!input) return this

    if (isBoolean(input)) {
      this.enable(input)
      return this
    }
    this.enable()

    let value: Partial<Options[`settings`]>

    if (raw === true && isFunction(input)) {
      const fn = input as (
        input: Partial<Options[`settings`]>,
      ) => Partial<Options[`settings`]>
      this.setSettings(fn(this.options.settings))
      return this
    }

    if (isFunction(input)) {
      const fn = input as (
        input: Container<Partial<Options['settings']>>,
      ) => Container<Partial<Options['settings']>>
      this.setSettings(fn(this.app.container(this.options.settings)).all())
      return this
    }

    this.setSettings(value)
    return this
  }
}

export {WordPressThemeJson}
