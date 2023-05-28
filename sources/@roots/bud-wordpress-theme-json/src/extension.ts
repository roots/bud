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
import type {
  Options,
  Theme,
} from '@roots/wordpress-theme-json-webpack-plugin'
import ThemeJsonWebpackPlugin from '@roots/wordpress-theme-json-webpack-plugin'

/**
 * Callback function used to configure wordpress `theme.json`
 */
export interface Mutator {
  (
    json:
      | Partial<Theme.GlobalSettingsAndStyles['settings']>
      | Container<Partial<Theme.GlobalSettingsAndStyles['settings']>>,
  ):
    | Partial<Theme.GlobalSettingsAndStyles['settings']>
    | Container<Partial<Theme.GlobalSettingsAndStyles['settings']>>
}

type Api = StrictPublicExtensionApi<
  WordPressThemeJSON,
  Options & Record<string, unknown>
> & {
  path: Options['path']
  generated?: Options['__generated__']
  customTemplates?: Options['customTemplates']
  patterns?: Options['patterns']
  styles?: Options['styles']
  templateParts?: Options['templateParts']
  version?: Options['version']
  settings?: Options['settings']
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
  path: DynamicOption.make(({path}) => path(`./theme.json`)),
  __generated__: undefined,
  customTemplates: undefined,
  patterns: undefined,
  styles: undefined,
  templateParts: undefined,
  version: undefined,
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
@plugin(ThemeJsonWebpackPlugin)
@expose(`wpjson`)
@disabled
export class WordPressThemeJSON
  extends Extension<Options, ThemeJsonWebpackPlugin>
  implements Api
{
  @bind
  // @ts-ignore
  public settings(
    input?:
      | Mutator
      | Container<Partial<Theme.GlobalSettingsAndStyles['settings']>>
      | Partial<Theme.GlobalSettingsAndStyles['settings']>
      | boolean,
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

    this.setOption(
      `settings`,
      value instanceof Container ? value.all() : value,
    )

    return this
  }

  public declare getSettings: Api['getSettings']
  public declare setSettings: Api['setSettings']

  public declare path: Api['path']
  public declare getPath: Api['getPath']
  public declare setPath: Api['setPath']

  public declare customTemplates: Api['customTemplates']
  public declare getCustomTemplates: Api['getCustomTemplates']
  public declare setCustomTemplates: Api['setCustomTemplates']

  public declare patterns: Api['patterns']
  public declare getPatterns: Api['getPatterns']
  public declare setPatterns: Api['setPatterns']

  public declare styles: Api['styles']
  public declare getStyles: Api['getStyles']
  public declare setStyles: Api['setStyles']

  public declare templateParts: Api['templateParts']
  public declare getTemplateParts: Api['getTemplateParts']
  public declare setTemplateParts: Api['setTemplateParts']

  public declare version: Api['version']
  public declare getVersion: Api['getVersion']
  public declare setVersion: Api['setVersion']
}
