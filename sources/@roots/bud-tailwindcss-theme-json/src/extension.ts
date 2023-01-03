import type {Bud} from '@roots/bud-framework'
import {Extension} from '@roots/bud-framework/extension'
import {
  bind,
  dependsOn,
  label,
} from '@roots/bud-framework/extension/decorators'
import type WordPressThemeJSON from '@roots/bud-wordpress-theme-json'

import * as tailwindAdapter from './tailwind/index.js'

/**
 * Acorn v2 public path fix
 *
 * @public
 * @decorator `@label`
 */
@label(`@roots/bud-tailwindcss-theme-json`)
@dependsOn([`@roots/bud-wordpress-theme-json`])
export class TailwindThemeJSON extends Extension {
  /**
   * `register` callback
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public override async register(bud: Bud) {
    bud.wpjson.useTailwindColors = this.useTailwindColors.bind(bud.wpjson)
    bud.wpjson.useTailwindFontFamily = this.useTailwindFontFamily.bind(
      bud.wpjson,
    )
    bud.wpjson.useTailwindFontSize = this.useTailwindFontSize.bind(
      bud.wpjson,
    )
  }

  public useTailwindColors(
    this: WordPressThemeJSON,
    extendOnly?: boolean,
  ): WordPressThemeJSON {
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
    this: WordPressThemeJSON,
    extendOnly?: boolean,
  ): WordPressThemeJSON {
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
    this: WordPressThemeJSON,
    extendOnly?: boolean,
  ): WordPressThemeJSON {
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
