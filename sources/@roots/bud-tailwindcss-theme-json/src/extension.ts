import type {Bud} from '@roots/bud-framework'
import {Extension} from '@roots/bud-framework/extension'
import {bind, label} from '@roots/bud-framework/extension/decorators'

import * as tailwindAdapter from './tailwind/index.js'

/**
 * Support Tailwind values in {@link Bud.wpjson}
 */
@label(`@roots/bud-tailwindcss-theme-json`)
export class TailwindThemeJSON extends Extension {
  /**
   * {@link Extension.register}
   */
  @bind
  public override async register(bud: Bud) {
    if (!(`wpjson` in bud)) return

    bud.wpjson.useTailwindColors = this.useTailwindColors.bind(bud.wpjson)
    bud.wpjson.useTailwindFontFamily = this.useTailwindFontFamily.bind(
      bud.wpjson,
    )
    bud.wpjson.useTailwindFontSize = this.useTailwindFontSize.bind(
      bud.wpjson,
    )
  }

  /**
   * Use tailwind colors in theme.json
   */
  public useTailwindColors(this: any, extendOnly?: boolean): any {
    this.set(
      `settings.color.palette`,
      tailwindAdapter.palette.transform(
        this.app.tailwind.resolveThemeValue(`colors`, extendOnly),
      ),
    )

    return this.enable()
  }

  /**
   * Use tailwind fontFamily in theme.json
   */
  public useTailwindFontFamily(this: any, extendOnly?: boolean): any {
    this.set(
      `settings.typography.fontFamilies`,
      tailwindAdapter.fontFamily.transform(
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
    )

    return this.enable()
  }

  /**
   * Use tailwind fontSize in theme.json
   */
  public useTailwindFontSize(this: any, extendOnly?: boolean): any {
    this.set(
      `settings.typography.fontSizes`,
      tailwindAdapter.fontSize.transform(
        Object.assign(
          {},
          {
            ...this.app.tailwind.resolveThemeValue(`fontSize`, extendOnly),
          },
        ),
      ),
    )

    return this.enable()
  }
}
