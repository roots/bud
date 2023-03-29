import {join} from 'node:path'

import type {Bud} from '@roots/bud-framework'
import {Extension} from '@roots/bud-framework/extension'
import {
  bind,
  dependsOn,
  expose,
  label,
  options,
} from '@roots/bud-framework/extension/decorators'
import get from '@roots/bud-support/lodash/get'
import isFunction from '@roots/bud-support/lodash/isFunction'
import defaultConfig from 'tailwindcss/defaultConfig.js'
import pluginUtils from 'tailwindcss/lib/util/pluginUtils.js'
import resolveConfig from 'tailwindcss/resolveConfig.js'
import type {Config, ThemeConfig} from 'tailwindcss/types/config.js'
import WebpackVirtualModules from 'webpack-virtual-modules'

interface BudTailwindVFile {
  name: string
  path: string | false
  module: Config
}

interface Options {
  generateImports?: Array<`${keyof ThemeConfig & string}`> | boolean
}

/**
 * TailwindCSS configuration
 */
@label(`@roots/bud-tailwindcss`)
@dependsOn([`@roots/bud-postcss`])
@expose(`tailwind`)
@options<Options>({
  generateImports: false,
})
export class BudTailwindCss extends Extension<Options> {
  /**
   * Tailwind config (path)
   */
  public get file(): BudTailwindVFile {
    const fallback: BudTailwindVFile = {
      name: `tailwind.config.cjs`,
      path: false,
      module: defaultConfig,
    }

    if (!this.app.context.files) return fallback

    return (
      Object.values(this.app.context.files).find(file =>
        file.name?.includes(`tailwind.config`),
      ) ?? fallback
    )
  }

  /**
   * Tailwind config (resolved)
   */
  public get config() {
    return {...(resolveConfig(this.file.module) ?? {})}
  }

  /**
   * Tailwind theme (resolved)
   */
  public get theme() {
    return this.config.theme
  }

  /**
   * Resolve a tailwind config value
   */
  @bind
  public resolveThemeValue<K extends `${keyof ThemeConfig & string}`>(
    key: K,
    extendedOnly?: boolean,
  ): Config[K] {
    if (!extendedOnly) {
      const rawValue = get(this.config.theme, key)

      if (!rawValue) {
        throw new Error(
          `@roots/bud-tailwindcss: ${key} is not a valid tailwind theme key.`,
        )
      }

      const value = isFunction(rawValue) ? rawValue(pluginUtils) : rawValue
      if (!value) {
        throw new Error(
          `@roots/bud-tailwindcss: value for ${key} could not be resolved.`,
        )
      }

      return value
    }

    if (!this.file.module) {
      throw new Error(
        `@roots/bud-tailwindcss: could not resolve a tailwind config but \`extendedOnly\` parameter is \`true\`.`,
      )
    }
    if (!this.file.module.theme) {
      throw new Error(
        `@roots/bud-tailwindcss: could not resolve \`theme\` key in tailwind config but \`extendedOnly\` parameter is \`true\`.`,
      )
    }
    if (!this.file.module.theme.extend) {
      throw new Error(
        `@roots/bud-tailwindcss: could not resolve \`theme.extend\` key in tailwind config but \`extendedOnly\` parameter is \`true\`.`,
      )
    }

    if (!this.file.module.theme.extend[key]) {
      throw new Error(
        `The key "${key}" is not present in your tailwind \`theme.extend\` config.\n\n${JSON.stringify(
          this.file?.module,
          null,
          2,
        )}`,
      )
    }

    const value = this.file.module.theme.extend[key]
    return isFunction(value) ? value(pluginUtils) : value
  }

  /**
   * {@link Extension.boot}
   */
  @bind
  public override async boot(bud: Bud) {
    if (!bud.postcss) {
      throw new Error(
        `@roots/bud-postcss is required to run @roots/bud-tailwindcss`,
      )
    }

    bud.postcss.setPlugins({
      nesting: await this.resolve(
        join(`tailwindcss`, `nesting`, `index.js`),
        import.meta.url,
      ),
      tailwindcss: [
        await this.resolve(`tailwindcss`, import.meta.url),
        this.file.path ?? this.file.module,
      ],
    })

    this.logger.success(`postcss configured for tailwindcss`)
  }

  /**
   * Generate import mapping
   *
   * @example
   * Generate colors import:
   *
   * ```js
   * bud.tailwind.generateImports([`colors`])
   * ```
   *
   * @example
   * Generate all imports:
   *
   * ```js
   * bud.tailwind.generateImports(true)
   * ```
   */
  @bind
  public async generateImports(
    imports?: Array<`${keyof ThemeConfig & string}`> | boolean,
  ) {
    const {theme} = this.config
    const makeStaticModule = (key: keyof ThemeConfig) => {
      const value = get(theme, key)

      this.logger.log(`@tailwind/${key}: generating module`)
      return `export default ${JSON.stringify(value)};`
    }

    this.app.hooks.action(`config.after`, async bud => {
      const importableKeys = Array.isArray(imports)
        ? imports
        : Object.keys(theme)

      const modules = importableKeys.reduce(
        (acc, key) => ({
          ...acc,
          [this.app.path(`@src`, `__bud`, `@tailwind`, `${key}.mjs`)]:
            makeStaticModule(key),
        }),
        {},
      )

      await this.app.extensions.add({
        label: `@roots/bud-tailwindcss/virtual-module`,
        make: async () => new WebpackVirtualModules(modules),
      } as any)

      this.app.hooks.async(
        `build.resolve.alias`,
        async (aliases = {}) => ({
          ...aliases,
          [`@tailwind`]: `${this.app.path(`@src`, `__bud`, `@tailwind`)}`,
        }),
      )
    })

    return this
  }
}
