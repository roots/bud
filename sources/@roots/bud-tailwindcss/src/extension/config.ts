import {bind} from '@roots/bud-framework/extension/decorators'
import get from '@roots/bud-support/lodash/get'
import isFunction from '@roots/bud-support/lodash/isFunction'
import pluginUtils from 'tailwindcss/lib/util/pluginUtils.js'
import resolveConfig from 'tailwindcss/resolveConfig.js'
import type {Config, ThemeConfig} from 'tailwindcss/types/config.js'

import {
  BudTailwindOptionsApi,
  type BudTailwindOptionsPublicInterface,
} from './options.js'

/**
 * TailwindCSS configuration
 */
class BudTailwindConfig extends BudTailwindOptionsApi {
  /**
   * Source tailwind config module and path
   */
  @bind
  public async sourceConfig(): Promise<void> {
    const foundConfig = Object.values(this.app.context.files).find(file =>
      file.name?.includes(`tailwind.config`),
    )

    if (foundConfig) {
      !this.configPath && this.setConfigPath(foundConfig.path)
      !this.config && this.setConfig({...foundConfig.module})
    } else {
      !this.configPath &&
        this.setConfigPath(
          await this.resolve(
            `tailwindcss/defaultConfig.js`,
            import.meta.url,
          ),
        )
    }

    if (!this.config) {
      const config = await this.import(this.configPath, import.meta.url)
      this.setConfig({...config.default})
    }

    if (!this.resolvedConfig) {
      this.setResolvedConfig({...resolveConfig({...this.config})})
    }
  }

  /**
   * Resolve a tailwind config value
   */
  @bind
  public resolveThemeValue<K extends `${keyof ThemeConfig & string}`>(
    key: K,
    extendedOnly?: boolean,
  ): Config[K] {
    if (extendedOnly) {
      if (!this.config?.theme?.extend)
        throw new Error(
          `@roots/bud-tailwindcss: cannot resolve extended theme value when no extended theme config is set.`,
        )

      const value = this.config.theme.extend[key]
      if (!value) {
        throw new Error(
          `@roots/bud-tailwindcss: extend.${key} is not a valid tailwind theme key.`,
        )
      }

      return isFunction(value) ? value(pluginUtils) : value
    }

    const value = this.resolvedConfig?.theme?.[key]
    if (!value) {
      throw new Error(
        `@roots/bud-tailwindcss: ${key} is not a valid tailwind theme key.`,
      )
    }

    return value
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
  public generateImports(
    imports: Array<`${keyof ThemeConfig & string}`> | boolean = true,
  ) {
    const makeStaticModule = (key: keyof ThemeConfig) => {
      const value = get(this.resolvedConfig.theme, key)
      this.logger.log(`@tailwind/${key}: generating module`)
      return `export default ${JSON.stringify(value)};`
    }

    this.app.hooks.action(`config.after`, async bud => {
      await this.sourceConfig()

      const importableKeys = Array.isArray(imports)
        ? imports
        : Object.keys(this.resolvedConfig.theme)

      const modules = importableKeys.reduce(
        (acc, key) => ({
          ...acc,
          [bud.path(`@src`, `__bud`, `@tailwind`, `${key}.mjs`)]:
            makeStaticModule(key),
        }),
        {},
      )

      bud.hooks.action(`build.before`, async bud => {
        const WebpackVirtualModules = await import(
          `webpack-virtual-modules`
        )

        await bud.extensions.add({
          label: `@roots/bud-tailwindcss/virtual-module`,
          make: async () => new WebpackVirtualModules.default(modules),
        })
        bud.hooks.async(`build.resolve.alias`, async (aliases = {}) => ({
          ...aliases,
          [`@tailwind`]: `${bud.path(`@src`, `__bud`, `@tailwind`)}`,
        }))
      })
    })

    return this
  }
}

export {BudTailwindConfig, type BudTailwindOptionsPublicInterface}
