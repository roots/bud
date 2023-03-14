import type {Bud} from '@roots/bud-framework'
import {Extension} from '@roots/bud-framework/extension'
import {
  bind,
  dependsOn,
  label,
} from '@roots/bud-framework/extension/decorators'

import * as tailwindAdapter from './tailwind/index.js'

/**
 * Acorn v2 public path fix
 */
@label(`@roots/bud-tailwindcss-theme-json`)
@dependsOn([`@roots/bud-wordpress-theme-json`])
export class TailwindThemeJSON extends Extension {
  /**
   * `register` callback
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
