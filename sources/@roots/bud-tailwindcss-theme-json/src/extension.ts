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
  public useTailwindColors(
    this: Bud[`wpjson`],
    extendOnly?: boolean,
  ): Bud[`wpjson`] {
    this.set(`settings`, {
      ...(this.get(`settings`) ?? {}),
      color: {
        ...((this.get(`settings.color`) as {}) ?? {}),
        palette: tailwindAdapter.palette.transform(
          this.app.tailwind.resolveThemeValue(`colors`, extendOnly),
        ),
      },
    })

    return this.enable()
  }

  /**
   * Use tailwind fontFamily in theme.json
   */
  public useTailwindFontFamily(
    this: Bud[`wpjson`],
    extendOnly?: boolean,
  ): Bud[`wpjson`] {
    this.set(`settings`, {
      ...(this.get(`settings`) ?? {}),
      typography: {
        ...((this.get(`settings.typography`) as {}) ?? {}),
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

    return this.enable()
  }

  /**
   * Use tailwind fontSize in theme.json
   */
  public useTailwindFontSize(
    this: Bud[`wpjson`],
    extendOnly?: boolean,
  ): Bud[`wpjson`] {
    this.set(`settings`, {
      ...(this.get(`settings`) ?? {}),
      typography: {
        ...((this.get(`settings.typography`) as {}) ?? {}),
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

    return this.enable()
  }
}
