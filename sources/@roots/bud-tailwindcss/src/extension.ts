import {Extension} from '@roots/bud-framework/extension'
import {
  bind,
  dependsOn,
  expose,
  label,
  options,
} from '@roots/bud-framework/extension/decorators'
import {get, isFunction, isUndefined} from '@roots/bud-support/lodash-es'
import pluginUtils from 'tailwindcss/lib/util/pluginUtils.js'
import resolveConfig from 'tailwindcss/resolveConfig.js'
import type {Config, ThemeConfig} from 'tailwindcss/types/config'
import WebpackVirtualModules from 'webpack-virtual-modules'

type ResolvedConfig = Partial<{
  [K in keyof Config['theme'] as `${K & string}`]: ReturnType<
    Config['theme'][K]
  >
}>

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
  public get theme(): ResolvedConfig {
    const configDescription =
      this.app.context.config[`tailwind.config.js`] ??
      this.app.context.config[`tailwind.config.mjs`] ??
      this.app.context.config[`tailwind.config.cjs`]

    return Object.assign(
      {},
      {...resolveConfig(configDescription.module).theme},
    )
  }

  /**
   * Resolved paths
   * @public
   */
  public dependencies: {tailwindcss: string; nesting: string} = {
    tailwindcss: null,
    nesting: null,
  }

  /**
   * Keys that can be imported from `@tailwind` alias
   *
   * @public
   */
  public get importableKeys(): Array<string> {
    return Array.isArray(this.options.generateImports)
      ? this.options.generateImports
      : Object.keys(this.theme)
  }

  /**
   * Resolve a tailwind config value
   * @public
   */
  @bind
  public resolveTailwindConfigValue<
    K extends `${keyof ThemeConfig & string}`,
  >(key: K): Config {
    const rawValue = this.theme[key]
    return isFunction(rawValue) ? rawValue(pluginUtils) : rawValue
  }

  /**
   * Generate a static module for a tailwind theme key
   * @param key - a tailwind confg key
   * @returns
   */
  @bind
  public makeStaticModule(key: keyof Config['theme']) {
    return `export default ${JSON.stringify(get(this.theme, key))}\n`
  }

  @bind
  public async generateImports(
    imports?: Array<`${keyof Config['theme'] & string}`> | boolean,
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
  }

  /**
   * `configAfter` callback
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public async configAfter() {
    this.app.postcss.setPlugins({
      nesting: this.dependencies.nesting,
      tailwindcss: this.dependencies.tailwindcss,
    })

    this.logger.success(`postcss configured for tailwindcss`)

    if (this.getOption(`generateImports`) !== false) {
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
  }
}
