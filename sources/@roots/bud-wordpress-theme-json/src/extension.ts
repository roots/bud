import {Extension} from '@roots/bud-framework'
import type {OptionsMap} from '@roots/bud-framework/extension'
import {
  bind,
  disabled,
  expose,
  label,
  options,
  plugin,
} from '@roots/bud-framework/extension/decorators'
import Value from '@roots/bud-framework/value'
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
@options({
  path: new Value(({path}) => path(`./theme.json`)),
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
export class WordPressThemeJSON extends Extension<
  Options,
  ThemeJsonWebpackPlugin
> {
  @bind
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

  public declare getSettings: () => Options['settings']
  public declare setSettings: (
    settings: OptionsMap<Options>['settings'],
  ) => this

  public declare path: Options['path']
  public declare getPath: () => Options['path']
  public declare setPath: (path: OptionsMap<Options>['path']) => this
}
