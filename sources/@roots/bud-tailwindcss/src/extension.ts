import {Extension} from '@roots/bud-framework/extension'
import {
  bind,
  dependsOn,
  expose,
  label,
  options,
} from '@roots/bud-framework/extension/decorators'
import {
  get,
  isFunction,
  isObject,
  isUndefined,
} from '@roots/bud-support/lodash-es'
import defaultConfig from 'tailwindcss/defaultConfig.js'
import pluginUtils from 'tailwindcss/lib/util/pluginUtils.js'
import resolveConfig from 'tailwindcss/resolveConfig.js'
import type {Config, ThemeConfig} from 'tailwindcss/types/config'
import WebpackVirtualModules from 'webpack-virtual-modules'

/**
 * TailwindCSS support for `@roots/bud`
 *
 * @public
 * @decorator `@label`
 * @decorator `@dependsOn`
 */
@label(`@roots/bud-tailwindcss`)
@dependsOn([`@roots/bud-postcss`])
@expose(`tailwind`)
@options({
  generateImports: false,
})
export default class BudTailwindCss extends Extension {
  /**
   * Resolved tailwind config
   *
   * @remarks
   * 🚨 Any mutations to this object will be applied to the generated tailwindcss!
   *
   * @public
   */
  public config: Config

  /**
   * Resolved paths
   * @public
   */
  public dependencies = {tailwindcss: null, nesting: null}

  /**
   * Keys that can be imported from `@tailwind` alias
   *
   * @public
   */
  public get importableKeys() {
    return Array.isArray(this.options.generateImports)
      ? this.options.generateImports
      : Object.keys(this.config.theme)
  }

  /**
   * Resolve a tailwind config value
   * @public
   */
  @bind
  public resolveTailwindConfigValue<
    K extends `${keyof ThemeConfig & string}`,
  >(key: K): Config {
    const rawValue = this.config?.theme?.[key]
    return isFunction(rawValue) ? rawValue(pluginUtils) : rawValue
  }

  /**
   * Generate a static module for a tailwind theme key
   * @param key - a tailwind confg key
   * @returns
   */
  @bind
  public makeStaticModule(key: keyof Config) {
    const value = get(this.config.theme, key)

    return isObject(value)
      ? Object.entries(value).reduce(
          (acc, [key, value]) =>
            `${acc}\nexport const ${key} = ${JSON.stringify(value)}\n`,
          ``,
        )
      : `export default ${key} = ${value}`
  }

  @bind
  public async generateImports(
    imports?: Array<`${keyof Config['theme'] & string}`>,
  ) {
    this.setOption(
      `generateImports`,
      !isUndefined(imports) ? imports : true,
    )
    return this
  }

  /**
   * `init` callback
   *
   * @public
   */
  @bind
  public async init() {
    this.dependencies.tailwindcss = await this.resolve(`tailwindcss`)
    this.dependencies.nesting = await this.resolve(
      `tailwindcss/nesting/index.js`,
    )

    const configDescription =
      this.app.context.config[`tailwind.config.js`] ??
      this.app.context.config[`tailwind.config.mjs`] ??
      this.app.context.config[`tailwind.config.cjs`]

    this.config = resolveConfig(configDescription.module)

    Object.assign(
      this.config,
      configDescription.module
        ? resolveConfig(configDescription.module)
        : resolveConfig(defaultConfig),
    )
  }

  /**
   * `configAfter` callback
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public async configAfter() {
    try {
      this.app.postcss.setPlugins({
        nesting: this.dependencies.nesting,
        tailwindcss: this.dependencies.tailwindcss,
      })

      this.logger.success(`postcss configured for tailwindcss`)
    } catch (message) {
      this.logger.error(message)
    }

    try {
      if (
        this.options.generateImports === true ||
        Array.isArray(this.options.generateImports)
      ) {
        await this.app.extensions.add({
          label: `bud-tailwindcss-virtual-module`,
          make: async () => {
            return new WebpackVirtualModules(
              this.importableKeys.reduce(
                (acc, key) => ({
                  ...acc,
                  [this.app.path(
                    `@src`,
                    `__bud`,
                    `@tailwind`,
                    `${key}.mjs`,
                  )]: this.makeStaticModule(key),
                }),
                {},
              ),
            )
          },
        })

        this.app.hooks.async(`build.resolve.alias`, async alias => ({
          ...alias,
          [`@tailwind`]: `${this.app.path(`@src`, `__bud`, `@tailwind`)}`,
        }))
      }
    } catch (message) {
      this.logger.error(message)
    }
  }
}
