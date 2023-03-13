import {Extension} from '@roots/bud-framework'
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
import ThemeJsonWebpackPlugin, {
  Options,
  Theme,
} from '@roots/wordpress-theme-json-webpack-plugin'

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
 * bud.wpjson.settings(theme => theme.set('color', {}))
 * ```
 *
 * @example
 * ```ts
 * bud.wpjson.set(`settings.color.custom`, true)
 * ```
 */
@label(`@roots/bud-wordpress-theme-json`)
@options<Options>({
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
@plugin(ThemeJsonWebpackPlugin)
@expose(`wpjson`)
@disabled
export class WordPressThemeJSON extends Extension<
  Options,
  ThemeJsonWebpackPlugin
> {
  /**
   * ## bud.wpjson.settings
   *
   * Configure the `settings` property of the `theme.json` file.
   *
   * @example
   * ```ts
   * bud.wpjson.settings(theme => theme.set('color', {}))
   * ```
   */
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

    this.set(`settings`, value instanceof Container ? value.all() : value)

    return this
  }
}
