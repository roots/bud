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

interface Options {
  color?: `extend` | boolean
  fontFamily?: `extend` | boolean
  fontSize?: `extend` | boolean
  spacing?: `extend` | boolean
}

/**
 * Support Tailwind values in {@link Bud.wpjson}
 */
@label(`@roots/bud-tailwindcss-theme-json`)
@options<Options>({
  color: false,
  fontFamily: false,
  fontSize: false,
  spacing: false,
})
export class TailwindThemeJSON extends Extension {
  /**
   * {@link Extension.apply}
   */
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

            if (this.options.color) {
              data = this.tapTailwindColor(data)
            }
            if (this.options.fontFamily) {
              data = this.tapTailwindFontFamily(data)
            }
            if (this.options.fontSize) {
              data = this.tapTailwindFontSize(data)
            }
            if (this.options.spacing) {
              data = this.tapTailwindSpacing(data)
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
    bud.wpjson.useTailwindSpacing = this.useTailwindSpacing
  }

  @bind
  public tapTailwindColor(options: SettingsAndStyles): SettingsAndStyles {
    const palette = tailwindAdapter.palette.transform({
      ...this.app.tailwind.resolveThemeValue(
        `colors`,
        this.options.color === `extend`,
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
  public tapTailwindFontFamily(
    json: SettingsAndStyles,
  ): SettingsAndStyles {
    const fontFamilies = tailwindAdapter.fontFamily.transform({
      ...this.app.tailwind.resolveThemeValue(
        `fontFamily`,
        this.options.fontFamily === `extend`,
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
  public tapTailwindFontSize(
    options: SettingsAndStyles,
  ): SettingsAndStyles {
    const fontSizes = tailwindAdapter.fontSize.transform({
      ...this.app.tailwind.resolveThemeValue(
        `fontSize`,
        this.options.fontSize === `extend`,
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

  @bind
  public tapTailwindSpacing(
    options: SettingsAndStyles,
  ): SettingsAndStyles {
    const spacingSizes = tailwindAdapter.spacing.transform({
      ...this.app.tailwind.resolveThemeValue(
        `spacing`,
        this.options.spacingSize === `extend`,
      ),
    })

    return {
      ...(options ?? {}),
      settings: {
        ...(options?.settings ?? {}),
        spacing: {
          ...(options?.settings?.spacing ?? {}),
          spacingSizes,
        },
      },
      version: 2,
    }
  }

  @bind
  public useTailwindColors(extend?: boolean): any {
    this.app.wpjson.enable()
    this.handleOption(`color`, extend)
    return this.app.wpjson
  }

  @bind
  public useTailwindFontFamily(extend?: boolean): any {
    this.app.wpjson.enable()
    this.handleOption(`fontFamily`, extend)
    return this.app.wpjson
  }

  @bind
  public useTailwindFontSize(extend?: `extend` | boolean): any {
    this.app.wpjson.enable()
    this.handleOption(`fontSize`, extend)
    return this.app.wpjson
  }

  @bind
  public useTailwindSpacing(extend?: boolean): any {
    this.app.wpjson.enable()
    this.handleOption(`spacing`, extend)
    return this.app.wpjson
  }

  private handleOption(option: string, value: `extend` | boolean) {
    switch (value) {
      case `extend`:
        this.set(option, `extend`)
        break
      case true:
        this.set(option, `extend`)
        break
      case false:
        this.set(option, false)
        break
      default:
        this.set(option, true)
    }
  }
}
