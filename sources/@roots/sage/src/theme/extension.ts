import {Extension} from '@roots/bud-framework'
import {
  bind,
  label,
  options,
  plugin,
  when,
} from '@roots/bud-framework/extension/decorators'
import {lodash as _} from '@roots/bud-support'
import {Container} from '@roots/container'

import {tailwind, WPThemeJson} from '.'
import {Options, ThemeJsonWebpackPlugin} from './plugin'

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
    if (!this.app.context.disk.config['tailwind.config.js']) return

    try {
      this.palette = await ThemeJson.tailwind.getPalette(
        this.app.path('./tailwind.config.js'),
      )
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
  ) {
    if (!input) return this.app

    this.when = async () => true

    const value = _.isFunction(input)
      ? input(
          raw
            ? this.options.settings
            : this.app.container(this.options.settings),
        )
      : _.isBoolean(input)
      ? this.options.settings
      : input

    this.setOption(
      'settings',
      value instanceof Container ? value.all() : value,
    )

    return this.app
  }

  @bind
  public useTailwindColors() {
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
