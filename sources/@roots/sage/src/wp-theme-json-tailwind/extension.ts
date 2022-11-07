import type {Bud} from '@roots/bud-framework'
import {Extension} from '@roots/bud-framework/extension'
import {
  bind,
  dependsOn,
  label,
} from '@roots/bud-framework/extension/decorators'

import type WpThemeJson from '../wp-theme-json/index.js'
import * as tailwindAdapter from './tailwind/index.js'

/**
 * Acorn v2 public path fix
 *
 * @public
 * @decorator `@label`
 */
@label(`@roots/sage/wp-theme-json-tailwind`)
@dependsOn([`@roots/sage/wp-theme-json`])
export default class WPThemeJsonTailwind extends Extension {
  /**
   * `register` callback
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public async register(bud: Bud) {
    bud.wpjson.useTailwindColors = this.useTailwindColors.bind(bud.wpjson)

    bud.wpjson.useTailwindFontFamily = this.useTailwindFontFamily.bind(
      bud.wpjson,
    )

    bud.wpjson.useTailwindFontSize = this.useTailwindFontSize.bind(
      bud.wpjson,
    )
  }

  public useTailwindColors(
    this: WpThemeJson,
    extendOnly?: boolean,
  ): WpThemeJson {
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

  public useTailwindFontFamily(
    this: WpThemeJson,
    extendOnly?: boolean,
  ): WpThemeJson {
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

  public useTailwindFontSize(
    this: WpThemeJson,
    extendOnly?: boolean,
  ): WpThemeJson {
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
