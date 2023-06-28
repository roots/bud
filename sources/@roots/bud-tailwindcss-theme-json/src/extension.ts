import type {Bud} from '@roots/bud-framework'
import type {Compiler} from '@roots/bud-support/webpack'

import {Extension} from '@roots/bud-framework/extension'
import {
  bind,
  label,
  options,
} from '@roots/bud-framework/extension/decorators'
import WordPressJSONPlugin, {
  type SettingsAndStyles,
} from '@roots/wordpress-theme-json-webpack-plugin'

import * as tailwindAdapter from './tailwind/index.js'

/**
 * Support Tailwind values in {@link Bud.wpjson}
 */
@label(`@roots/bud-tailwindcss-theme-json`)
@options({
  colors: false,
  colorsExtendOnly: false,
  fontFamilies: false,
  fontFamiliesExtendOnly: false,
  fontSizes: false,
  fontSizesExtendOnly: false,
})
export class TailwindThemeJSON extends Extension {
  @bind
  public override apply(compiler: Compiler) {
    compiler.hooks.thisCompilation.tap(
      `@roots/bud-tailwindcss-theme-json`,
      compilation => {
        const hooks = WordPressJSONPlugin.getCompilationHooks(compilation)

        hooks.dependencies.tap(
          `@roots/bud-tailwindcss-theme-json`,
          dependencies => [...dependencies, this.app.tailwind.configPath],
        )

        hooks.options.tapPromise(
          `@roots/bud-tailwindcss-theme-json`,
          async data => {
            if (this.app.isDevelopment)
              await this.app.tailwind.sourceConfig()

            if (this.options.colors) {
              data = this.tapColorsManifestObject(data)
            }
            if (this.options.fontFamilies) {
              data = this.tapFontFamiliesManifestObject(data)
            }
            if (this.options.fontSizes) {
              data = this.tapFontSizesManifestObject(data)
            }

            return data
          },
        )
      },
    )
  }

  /**
   * {@link Extension.register}
   */
  @bind
  public override async register(bud: Bud) {
    if (!(`wpjson` in bud)) return

    bud.wpjson.useTailwindColors = this.useTailwindColors
    bud.wpjson.useTailwindFontFamily = this.useTailwindFontFamily
    bud.wpjson.useTailwindFontSize = this.useTailwindFontSize
  }

  @bind
  public tapColorsManifestObject(
    options: SettingsAndStyles,
  ): SettingsAndStyles {
    const palette = tailwindAdapter.palette.transform({
      ...this.app.tailwind.resolveThemeValue(
        `colors`,
        this.options.colorsExtendOnly,
      ),
    })

    return {
      ...(options ?? {}),
      settings: {
        ...(options?.settings ?? {}),
        color: {
          ...(options?.settings?.color ?? {}),
          palette,
        },
      },
      version: 2,
    }
  }

  @bind
  public tapFontFamiliesManifestObject(
    json: SettingsAndStyles,
  ): SettingsAndStyles {
    const fontFamilies = tailwindAdapter.fontFamily.transform({
      ...this.app.tailwind.resolveThemeValue(
        `fontFamily`,
        this.options.fontFamiliesExtendOnly,
      ),
    })

    return {
      ...(json ?? {}),
      settings: {
        ...(json?.settings ?? {}),
        typography: {
          ...(json?.settings?.typography ?? {}),
          fontFamilies,
        },
      },
      version: 2,
    }
  }

  @bind
  public tapFontSizesManifestObject(
    options: SettingsAndStyles,
  ): SettingsAndStyles {
    const fontSizes = tailwindAdapter.fontSize.transform({
      ...this.app.tailwind.resolveThemeValue(
        `fontSize`,
        this.options.fontSizeExtendOnly,
      ),
    })

    return {
      ...(options ?? {}),
      settings: {
        ...(options?.settings ?? {}),
        typography: {
          ...(options?.settings?.typography ?? {}),
          fontSizes,
        },
      },
      version: 2,
    }
  }

  /**
   * Use tailwind colors in theme.json
   */
  @bind
  public useTailwindColors(extendOnly: boolean = false): any {
    this.app.wpjson.enable()
    this.set(`colors`, true)
    this.set(`colorsExtendOnly`, extendOnly)

    return this.app.wpjson
  }

  /**
   * Use tailwind fontFamily in theme.json
   */
  @bind
  public useTailwindFontFamily(extendOnly: boolean = false): any {
    this.app.wpjson.enable()
    this.set(`fontFamilies`, true)
    this.set(`fontFamiliesExtendOnly`, extendOnly)

    return this.app.wpjson
  }

  /**
   * Use tailwind fontSize in theme.json
   */
  @bind
  public useTailwindFontSize(extendOnly: boolean = false): any {
    this.app.wpjson.enable()
    this.set(`fontSizes`, true)
    this.set(`fontSizesExtendOnly`, extendOnly)

    return this.app.wpjson
  }
}
