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
import isUndefined from '@roots/bud-support/lodash/isUndefined'
import defaultConfig from 'tailwindcss/defaultConfig.js'
import pluginUtils from 'tailwindcss/lib/util/pluginUtils.js'
import resolveConfig from 'tailwindcss/resolveConfig.js'
import type {Config, ThemeConfig} from 'tailwindcss/types/config.js'
import WebpackVirtualModules from 'webpack-virtual-modules'

type ResolvedConfig = Partial<{
  [K in keyof ThemeConfig as `${K & string}`]: ReturnType<ThemeConfig[K]>
}>

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
   * Config path
   */
  private get path(): string | undefined {
    return (
      this.app.context.config[`tailwind.config.js`]?.path ??
      this.app.context.config[`tailwind.config.mjs`]?.path ??
      this.app.context.config[`tailwind.config.cjs`]?.path
    )
  }

  /**
   * Tailwind config (source)
   */
  private declare source: Config | undefined

  /**
   * Tailwind config (resolved)
   */
  private declare config: ResolvedConfig | undefined

  @bind
  public getConfig(): BudTailwindCss[`config`] {
    return this.config ?? undefined
  }
  /**
   * Get config source module
   */
  @bind
  public async getSource(): Promise<Config> {
    let config: Config

    if (this.path) {
      try {
        config = await this.app.module.import(this.path)
        return config
      } catch (error) {}
    }

    return defaultConfig
  }

  /**
   * Resolved tailwind config
   *
   * @remarks
   * 🚨 Any mutations to this object will be applied to the generated tailwindcss!
   */
  private declare theme:
    | (ResolvedConfig & {
        colors?: ResolvedConfig['colors']
      })
    | undefined

  @bind
  public getTheme() {
    return this.theme
  }

  /**
   * Resolved paths
   */
  public dependencies: {tailwindcss: string; nesting: string} = {
    tailwindcss: null,
    nesting: null,
  }

  /**
   * Keys that can be imported from `@tailwind` alias
   */
  public get importableKeys(): Array<string> {
    const generateImports = this.get(`generateImports`)
    return Array.isArray(generateImports)
      ? generateImports
      : Object.keys(this.theme)
  }

  /**
   * Resolve a tailwind config value
   */
  @bind
  public resolveThemeValue<K extends `${keyof ThemeConfig & string}`>(
    key: K,
    extendedOnly?: boolean,
  ): Config[K] {
    const rawValue = get(this.theme, key)

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

    const src = this.source?.theme?.extend?.[key]

    if (!src) {
      throw new Error(
        `The key "${key}" is not extended in your tailwind config.\n\n${JSON.stringify(
          this.source,
          null,
          2,
        )}`,
      )
    }

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
   */
  @bind
  public makeStaticModule(key: keyof ThemeConfig) {
    return `export default ${JSON.stringify(get(this.theme, key))}\n`
  }

  /**
   * {@link Extension.register}
   */
  @bind
  public override async register(_bud: Bud) {
    this.dependencies.tailwindcss = await this.resolve(`tailwindcss`)
    this.dependencies.nesting = await this.resolve(
      `tailwindcss/nesting/index.js`,
    )

    this.source = await this.getSource()

    const resolvedConfig = resolveConfig(this.source)
    if (!resolvedConfig) return

    this.config = {...resolvedConfig}
    this.theme = {...(this.config?.theme ?? {})}
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
      nesting: this.dependencies.nesting,
      tailwindcss: [this.dependencies.tailwindcss, this.path],
    })

    this.logger.success(`postcss configured for tailwindcss`)
  }

  /**
   * {@link Extension.configAfter}
   */
  @bind
  public override async configAfter(bud: Bud) {
    if (this.get(`generateImports`) === false) return

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
    } as any)

    bud.hooks.async(`build.resolve.alias`, async (aliases = {}) => ({
      ...aliases,
      [`@tailwind`]: `${bud.path(`@src`, `__bud`, `@tailwind`)}`,
    }))
  }

  /**
   * Generate import mapping
   * @deprecated Use {@link BudTailwindCss.set} instead
   *
   * @example
   * Generate colors import:
   *
   * ```js
   * bud.tailwind.set(`generateImports`, [`colors`])
   * ```
   *
   * @example
   * Generate all imports:
   *
   * ```js
   * bud.tailwind.set(`generateImports`, true)
   * ```
   */
  @bind
  public async generateImports(
    imports?: Array<`${keyof ThemeConfig & string}`> | boolean,
  ) {
    this.set(`generateImports`, !isUndefined(imports) ? imports : true)
    return this
  }
}
