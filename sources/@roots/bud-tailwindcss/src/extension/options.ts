import {
  DynamicOption,
  Extension,
  type StrictPublicExtensionApi,
} from '@roots/bud-framework/extension'
import {bind, options} from '@roots/bud-framework/extension/decorators'
import get from '@roots/bud-support/lodash/get'
import isFunction from '@roots/bud-support/lodash/isFunction'
import pluginUtils from 'tailwindcss/lib/util/pluginUtils.js'
import resolveConfig from 'tailwindcss/resolveConfig.js'
import type {Config, ThemeConfig} from 'tailwindcss/types/config.js'

type Options = {
  resolvedConfig?: ReturnType<typeof resolveConfig>
  config: Config
  configPath: string
}

type BudTailwindOptionsPublicInterface = StrictPublicExtensionApi<
  BudTailwindOptionsApi,
  Options
> & {
  generateImports(
    imports: Array<`${keyof ThemeConfig & string}`> | boolean,
  ): BudTailwindOptionsPublicInterface
  getTheme(): ThemeConfig
  getTheme<K extends keyof ThemeConfig & string>(
    key?: `${K}`,
  ): ThemeConfig[K]
  setTheme(theme: ThemeConfig): BudTailwindOptionsPublicInterface
  setTheme<K extends keyof ThemeConfig & string>(
    key: K,
    theme: ThemeConfig[K],
  ): BudTailwindOptionsPublicInterface
  extendTheme(
    theme: Partial<ThemeConfig>,
  ): BudTailwindOptionsPublicInterface
  extendTheme<K extends keyof ThemeConfig & string>(
    key: `${K}`,
    theme: ThemeConfig[K],
  ): BudTailwindOptionsPublicInterface
  getPlugins(): Config[`plugins`]
  setPlugins(plugins: Config[`plugins`]): BudTailwindOptionsPublicInterface
  getContent(): Config[`content`]
  setContent(content: Config[`content`]): BudTailwindOptionsPublicInterface
}

/**
 * TailwindCSS configuration
 */
@options<Options>({
  resolvedConfig: undefined,
  config: DynamicOption.make(bud => ({
    content: [
      bud.path(`@src`, `**`, `*`),
      `!${bud.path(`@src`, `**`, `*.{css,scss}`)}`,
    ],
  })),
  configPath: undefined,
})
class BudTailwindOptionsApi
  extends Extension<Options>
  implements BudTailwindOptionsPublicInterface
{
  /**
   * Tailwind config path
   */
  public declare configPath: BudTailwindOptionsPublicInterface[`configPath`]
  public declare getConfigPath: BudTailwindOptionsPublicInterface[`getConfigPath`]
  public declare setConfigPath: BudTailwindOptionsPublicInterface[`setConfigPath`]

  /**
   * Tailwind config
   */
  public declare config: BudTailwindOptionsPublicInterface[`config`]
  public declare getConfig: BudTailwindOptionsPublicInterface[`getConfig`]
  public declare setConfig: BudTailwindOptionsPublicInterface[`setConfig`]

  /**
   * Tailwind config (resolved)
   */
  public declare resolvedConfig: BudTailwindOptionsPublicInterface[`resolvedConfig`]
  public declare getResolvedConfig: BudTailwindOptionsPublicInterface[`getResolvedConfig`]
  public declare setResolvedConfig: BudTailwindOptionsPublicInterface[`setResolvedConfig`]

  /**
   * Source tailwind config module and path
   */
  @bind
  public async sourceConfig(): Promise<void> {
    try {
      const foundConfig = Object.values(this.app.context.files).find(
        file => file.name?.includes(`tailwind.config`),
      )

      if (foundConfig) {
        !this.configPath && this.setConfigPath(foundConfig.path)
        this.setConfig({...foundConfig.module})
      }
      this.setResolvedConfig(this.resolveConfig())
    } catch (err) {
      this.setConfig(undefined)
      this.setResolvedConfig(undefined)
    }
  }

  @bind
  public resolveConfig() {
    this.logger.time(`resolve config`)
    const resolvedConfig = {...resolveConfig({...this.config})}
    this.logger.timeEnd(`resolve config`)
    return resolvedConfig
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

  @bind
  public getTheme<K extends keyof ThemeConfig & string>(key?: K) {
    return key
      ? this.resolvedConfig?.theme?.[key]
      : this.resolvedConfig?.theme
  }

  @bind
  public setTheme<
    K extends `${keyof ThemeConfig & string}` | undefined,
    V extends ThemeConfig | ((theme: ThemeConfig) => ThemeConfig),
    VK extends
      | ThemeConfig[K]
      | ((theme: ThemeConfig[K]) => ThemeConfig[K]),
  >(...params: [V] | [K, VK]) {
    if (params.length === 1) {
      const [value] = params
      this.setConfig((config = {content: []}) => ({
        ...config,
        theme: {...(config.theme ?? {}), ...value},
      }))
      return this
    }

    const [key, value] = params
    this.setConfig((config = {content: []}) => ({
      ...config,
      theme: {...(config.theme ?? {}), [key]: value},
    }))
    return this
  }

  @bind
  public extendTheme<
    K extends `${keyof ThemeConfig & string}` | undefined,
    V extends Partial<ThemeConfig>,
    VK extends ThemeConfig[K],
  >(...params: [V] | [K, VK]) {
    if (params.length === 1) {
      const [value] = params
      this.setConfig((config = {content: []}) => ({
        ...config,
        theme: {
          ...(config?.theme ?? {}),
          extend: {...(config.theme?.extend ?? {}), ...value},
        },
      }))
      this.setResolvedConfig(this.resolveConfig())
      return this
    }

    const [key, value] = params
    this.setConfig(config => ({
      ...config,
      theme: {
        ...(config?.theme ?? {}),
        extend: {...(config.theme?.extend ?? {}), [key]: value},
      },
    }))
    this.setResolvedConfig(this.resolveConfig())
    return this
  }

  @bind
  public getPlugins() {
    return this.config?.plugins
  }

  @bind
  public setPlugins(plugins: Config[`plugins`]) {
    this.setConfig((config = {content: []}) => ({
      ...config,
      plugins,
    }))
    this.setResolvedConfig(this.resolveConfig())
    return this
  }

  @bind
  public getContent() {
    return this.config?.content
  }

  @bind
  public setContent(content: Config[`content`]) {
    this.setConfig((config = {content: []}) => ({
      ...config,
      content,
    }))
    return this
  }
}

export {
  BudTailwindOptionsApi,
  type BudTailwindOptionsPublicInterface,
  type Options,
}
