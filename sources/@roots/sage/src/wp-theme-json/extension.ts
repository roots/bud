import {Extension} from '@roots/bud-framework'
import {
  bind,
  dependsOnOptional,
  disabled,
  expose,
  label,
  options,
  plugin,
} from '@roots/bud-framework/extension/decorators'
import type {GlobalSettingsAndStyles as WPThemeJson} from '@roots/bud-preset-wordpress/theme'
import {isBoolean, isFunction} from '@roots/bud-support/lodash-es'
import Container from '@roots/container'

import {Options, ThemeJsonWebpackPlugin} from './plugin.js'
import * as tailwindAdapter from './tailwind/index.js'

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
 * @decorator `@expose`
 * @decorator `@disabled`
 */
@label(`@roots/sage/wp-theme-json`)
@dependsOnOptional([`@roots/bud-tailwindcss`])
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
@plugin(ThemeJsonWebpackPlugin)
@expose(`wpjson`)
@disabled
export default class ThemeJson extends Extension<
  Options,
  ThemeJsonWebpackPlugin
> {
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
  public useTailwindColors(extendOnly?: boolean): this {
    if (!this.app.extensions.has(`@roots/bud-tailwindcss`))
      throw new Error(
        `@roots/bud-tailwindcss is required in order to call \`useTailwindColors\``,
      )

    this.setOption(`settings`, {
      ...(this.options.settings ?? {}),
      color: {
        ...(this.options.settings?.color ?? {}),
        palette: tailwindAdapter.palette.transform(
          this.app.tailwind.resolveThemeValue(`colors`, extendOnly),
        ),
      },
    })

    return this
  }

  @bind
  public useTailwindFontFamily(extendOnly?: boolean): this {
    this.setOption(`settings`, {
      ...(this.options.settings ?? {}),
      typography: {
        ...(this.options.settings?.typography ?? {}),
        fontFamilies: tailwindAdapter.fontFamily.transform(
          Object.assign(
            {},
            {
              ...this.app.tailwind.resolveThemeValue(
                `fontFamily`,
                extendOnly,
              ),
            },
          ),
        ),
      },
    })

    return this
  }

  @bind
  public useTailwindFontSize(extendOnly?: boolean): this {
    this.setOption(`settings`, {
      ...(this.options.settings ?? {}),
      typography: {
        ...(this.options.settings?.typography ?? {}),
        fontSizes: tailwindAdapter.fontSize.transform(
          Object.assign(
            {},
            {
              ...this.app.tailwind.resolveThemeValue(
                `fontSize`,
                extendOnly,
              ),
            },
          ),
        ),
      },
    })

    return this
  }
}
