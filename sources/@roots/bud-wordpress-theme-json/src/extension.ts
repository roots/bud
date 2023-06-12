import type {
  Options,
  Schema,
} from '@roots/wordpress-theme-json-webpack-plugin'

import {
  DynamicOption,
  Extension,
  type StrictPublicExtensionApi,
} from '@roots/bud-framework/extension'
import {
  bind,
  disabled,
  expose,
  label,
  options,
  plugin,
} from '@roots/bud-framework/extension/decorators'
import isBoolean from '@roots/bud-support/lodash/isBoolean'
import isFunction from '@roots/bud-support/lodash/isFunction'
import Container from '@roots/container'
import ThemeJsonWebpackPlugin from '@roots/wordpress-theme-json-webpack-plugin'

/**
 * Callback function used to configure wordpress `theme.json`
 */
interface Mutator {
  (
    json:
      | Container<Partial<Schema.SettingsAndStyles['settings']>>
      | Partial<Schema.SettingsAndStyles['settings']>,
  ):
    | Container<Partial<Schema.SettingsAndStyles['settings']>>
    | Partial<Schema.SettingsAndStyles['settings']>
}

type Api = StrictPublicExtensionApi<
  WordPressThemeJSON,
  Options & Record<string, unknown>
> & {
  customTemplates: Options['customTemplates']
  generated: Options['__generated__']
  path: Options['path']
  patterns: Options['patterns']
  /**
   * ## bud.wpjson.settings
   *
   * Define `theme.json` settings using an options object or callback
   */
  settings: WordPressThemeJSON[`settings`]
  styles: Options['styles']
  templateParts: Options['templateParts']
  /**
   * ## bud.wpjson.useTailwindColors
   *
   * Source `theme.json` color values from `tailwind.config.js`
   *
   * @note
   * Requires {@link https://bud.js.org/extensions/bud-tailwindcss/ @roots/bud-tailwindcss} to be installed.
   */
  useTailwindColors: (value?: boolean, extendOnly?: boolean) => Api

  /**
   * ## bud.wpjson.useTailwindFontFamily
   *
   * Source `theme.json` fontFamily values from `tailwind.config.js`
   *
   * @note
   * Requires {@link https://bud.js.org/extensions/bud-tailwindcss/ @roots/bud-tailwindcss} to be installed.
   */
  useTailwindFontFamily: (value?: boolean, extendOnly?: boolean) => Api

  /**
   * ## bud.wpjson.useTailwindFontSize
   *
   * Source `theme.json` fontSize values from `tailwind.config.js`
   *
   * @note
   * Requires {@link https://bud.js.org/extensions/bud-tailwindcss/ @roots/bud-tailwindcss} to be installed.
   */
  useTailwindFontSize: (value?: boolean, extendOnly?: boolean) => Api

  version: Options['version']
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
  __generated__: undefined,
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
  version: undefined,
})
@plugin(ThemeJsonWebpackPlugin)
@expose(`wpjson`)
@disabled
class WordPressThemeJSON
  extends Extension<Options, ThemeJsonWebpackPlugin>
  implements Api
{
  public declare customTemplates: Api['customTemplates']

  public declare getCustomTemplates: Api['getCustomTemplates']
  public declare getPath: Api['getPath']

  public declare getPatterns: Api['getPatterns']
  public declare getSettings: Api['getSettings']
  public declare getStyles: Api['getStyles']

  public declare getTemplateParts: Api['getTemplateParts']
  public declare getVersion: Api['getVersion']
  public declare path: Api['path']

  public declare patterns: Api['patterns']
  public declare setCustomTemplates: Api['setCustomTemplates']
  public declare setPath: Api['setPath']

  public declare setPatterns: Api['setPatterns']
  public declare setSettings: Api['setSettings']
  public declare setStyles: Api['setStyles']

  public declare setTemplateParts: Api['setTemplateParts']
  public declare setVersion: Api['setVersion']
  public declare styles: Api['styles']

  public declare templateParts: Api['templateParts']
  public declare version: Api['version']
  @bind
  // @ts-ignore
  public settings(
    input?:
      | boolean
      | Container<Partial<Schema.SettingsAndStyles['settings']>>
      | Mutator
      | Partial<Schema.SettingsAndStyles['settings']>,
    raw?: boolean,
  ): this {
    if (!input) return this

    this.enable()

    const value = isFunction(input)
      ? input(
          raw
            ? this.options.settings
            : this.app.container(this.options.settings),
        )
      : isBoolean(input)
      ? this.options.settings
      : input

    this.setSettings(value instanceof Container ? value.all() : value)

    return this
  }
}

export {type Api, WordPressThemeJSON}
