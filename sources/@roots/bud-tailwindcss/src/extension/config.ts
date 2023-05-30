import {bind} from '@roots/bud-framework/extension/decorators'
import get from '@roots/bud-support/lodash/get'
import isFunction from '@roots/bud-support/lodash/isFunction'
import defaultConfig from 'tailwindcss/defaultConfig.js'
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
  public async sourceConfigModule(): Promise<void> {
    if (!this.app.context.files) {
      this.logger.log(
        `no config files registered to bud.js. using fallback.`,
      )
      this.setConfig(defaultConfig)
      this.setResolvedConfig(resolveConfig(defaultConfig))
    }

    const foundConfig = Object.values(this.app.context.files).find(file =>
      file.name?.includes(`tailwind.config`),
    )

    if (!foundConfig) {
      this.logger.log(`no tailwind config found. using fallback.`)
      this.setConfig(defaultConfig)
      this.setResolvedConfig(resolveConfig(defaultConfig))
      return
    }

    this.setConfigPath(foundConfig.path)
    this.setConfig(foundConfig.module)
    this.setResolvedConfig(resolveConfig(foundConfig.module))
  }

  /**
   * Resolve a tailwind config value
   */
  @bind
  public resolveThemeValue<K extends `${keyof ThemeConfig & string}`>(
    key: K,
    extended?: boolean,
  ): Config[K] {
    if (extended) {
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
      const value = get(theme, key)
      this.logger.log(`@tailwind/${key}: generating module`)
      return `export default ${JSON.stringify(value)};`
    }

    const {theme} = this.resolvedConfig

    this.app.hooks.action(`config.after`, async bud => {
      const importableKeys = Array.isArray(imports)
        ? imports
        : Object.keys(theme)

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
