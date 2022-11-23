import type {Bud} from '@roots/bud-framework'
import {Extension} from '@roots/bud-framework/extension'
import {
  bind,
  dependsOn,
  expose,
  label,
  options,
} from '@roots/bud-framework/extension/decorators'
import {get, isFunction, isUndefined} from '@roots/bud-support/lodash-es'
import defaultConfig from 'tailwindcss/defaultConfig.js'
import pluginUtils from 'tailwindcss/lib/util/pluginUtils.js'
import resolveConfig from 'tailwindcss/resolveConfig.js'
import type {Config, ThemeConfig} from 'tailwindcss/types/config.js'
import WebpackVirtualModules from 'webpack-virtual-modules'

type ResolvedConfig = Partial<{
  [K in keyof ThemeConfig as `${K & string}`]: ReturnType<ThemeConfig[K]>
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
@options({generateImports: false})
export class BudTailwindCss extends Extension<{
  generateImports: boolean | Array<string>
}> {
  /**
   * Get config module
   *
   * @public
   */
  public get configSource(): Config {
    return (
      this.app.context.config[`tailwind.config.js`]?.module ??
      this.app.context.config[`tailwind.config.mjs`]?.module ??
      this.app.context.config[`tailwind.config.cjs`]?.module ??
      defaultConfig
    )
  }

  public config: ResolvedConfig | undefined

  /**
   * Resolved tailwind config
   *
   * @remarks
   * 🚨 Any mutations to this object will be applied to the generated tailwindcss!
   *
   * @public
   */
  public theme:
    | (ResolvedConfig & {
        colors?: ResolvedConfig['colors']
      })
    | undefined

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
  public resolveThemeValue<K extends `${keyof ThemeConfig & string}`>(
    key: K,
    extendedOnly?: boolean,
  ): Config[K] {
    const rawValue = this.theme[key]
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

    if (!extendedOnly) return value

    const src = this.configSource?.theme?.extend?.[key]
    if (!src)
      throw new Error(
        `The key "${key}" is not extended in your tailwind config.\n\n${JSON.stringify(
          this.configSource,
          null,
          2,
        )}`,
      )
    const extended = isFunction(src) ? src(pluginUtils) : src

    return Object.entries(value).reduce(
      (a, [k, v]) => ({
        ...a,
        ...(Object.keys(extended).includes(k) ? {[k]: v} : {}),
      }),
      {},
    )
  }

  /**
   * Generate a static module for a tailwind theme key
   * @param key - a tailwind confg key
   * @returns
   */
  @bind
  public makeStaticModule(key: keyof ThemeConfig) {
    return `export default ${JSON.stringify(get(this.theme, key))}\n`
  }

  @bind
  public async generateImports(
    imports?: Array<`${keyof ThemeConfig & string}`> | boolean,
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
  public override async init() {
    this.dependencies.tailwindcss = await this.resolve(`tailwindcss`)
    this.dependencies.nesting = await this.resolve(
      `tailwindcss/nesting/index.js`,
    )

    const resolvedConfig = resolveConfig(this.configSource)
    if (!resolvedConfig) return

    this.config = {...resolvedConfig}
    this.theme = {...(this.config?.theme ?? {})}
  }

  /**
   * `configAfter` callback
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public override async configAfter(bud: Bud) {
    bud.postcss.setPlugins({
      nesting: this.dependencies.nesting,
      tailwindcss: this.dependencies.tailwindcss,
    })

    this.logger.success(`postcss configured for tailwindcss`)

    if (this.options.generateImports === false) return

    await bud.extensions.add({
      label: `@roots/bud-tailwindcss/virtual-module`,
      make: async () =>
        new WebpackVirtualModules(
          this.importableKeys.reduce(
            (acc, key) => ({
              ...acc,
              [bud.path(`@src`, `__bud`, `@tailwind`, `${key}.mjs`)]:
                this.makeStaticModule(key),
            }),
            {},
          ),
        ),
    })

    bud.hooks.async(`build.resolve.alias`, async alias => ({
      ...alias,
      [`@tailwind`]: `${bud.path(`@src`, `__bud`, `@tailwind`)}`,
    }))
  }
}
