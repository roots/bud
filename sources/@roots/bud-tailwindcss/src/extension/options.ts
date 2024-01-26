import type {Config, ThemeConfig} from 'tailwindcss/types/config.js'

import {
  DynamicOption,
  Extension,
  type StrictPublicExtensionApi,
} from '@roots/bud-framework/extension'
import {bind, options} from '@roots/bud-framework/extension/decorators'
import get from '@roots/bud-support/get'
import isFunction from '@roots/bud-support/isFunction'
import pluginUtils from 'tailwindcss/lib/util/pluginUtils.js'
import resolveConfig from 'tailwindcss/resolveConfig.js'

type Options = {
  config: Config
  configPath: string
  resolvedConfig?: ReturnType<typeof resolveConfig<Config>>
}

type BudTailwindOptionsPublicInterface = StrictPublicExtensionApi<
  BudTailwindOptionsApi,
  Options
> & {
  extend(theme: Partial<ThemeConfig>): BudTailwindOptionsPublicInterface
  extendTheme(
    theme: Partial<ThemeConfig>,
  ): BudTailwindOptionsPublicInterface
  extendTheme<K extends keyof ThemeConfig & string>(
    key: `${K}`,
    theme: ThemeConfig[K],
  ): BudTailwindOptionsPublicInterface
  generateImports(
    imports: Array<`${keyof ThemeConfig & string}`> | boolean,
  ): BudTailwindOptionsPublicInterface
  getContent(): Config[`content`]
  getPlugins(): Config[`plugins`]
  getTheme(): ThemeConfig
  getTheme<K extends keyof ThemeConfig & string>(
    key?: `${K}`,
  ): K extends ThemeConfig ? ThemeConfig[K] : ThemeConfig
  setContent(content: Config[`content`]): BudTailwindOptionsPublicInterface
  setPlugins(plugins: Config[`plugins`]): BudTailwindOptionsPublicInterface
  setTheme(theme: ThemeConfig): BudTailwindOptionsPublicInterface
  setTheme<K extends keyof ThemeConfig & string>(
    key: K,
    theme: ThemeConfig[K],
  ): BudTailwindOptionsPublicInterface
}

/**
 * TailwindCSS configuration
 */
@options<Options>({
  config: DynamicOption.make(bud => ({
    content: [
      bud.path(`@src`, `**`, `*`),
      `!${bud.path(`@src`, `**`, `*.{css,scss}`)}`,
    ],
  })),
  configPath: undefined,
  resolvedConfig: undefined,
})
class BudTailwindOptionsApi
  extends Extension<Options>
  implements BudTailwindOptionsPublicInterface
{
  /**
   * Tailwind config
   */
  public declare config: BudTailwindOptionsPublicInterface[`config`]

  /**
   * Tailwind config path
   */
  public declare configPath: BudTailwindOptionsPublicInterface[`configPath`]
  public declare getConfig: BudTailwindOptionsPublicInterface[`getConfig`]

  public declare getConfigPath: BudTailwindOptionsPublicInterface[`getConfigPath`]
  public declare getResolvedConfig: BudTailwindOptionsPublicInterface[`getResolvedConfig`]
  /**
   * Tailwind config (resolved)
   */
  public declare resolvedConfig: BudTailwindOptionsPublicInterface[`resolvedConfig`]

  public declare setConfig: BudTailwindOptionsPublicInterface[`setConfig`]
  public declare setConfigPath: BudTailwindOptionsPublicInterface[`setConfigPath`]
  public declare setResolvedConfig: BudTailwindOptionsPublicInterface[`setResolvedConfig`]

  @bind
  public extendTheme<
    K extends `${keyof ThemeConfig & string}` | undefined,
    V extends Partial<ThemeConfig>,
    VK extends Partial<ThemeConfig>[K],
  >(...params: [K, VK] | [V]) {
    if (params.length === 1) {
      const [value] = params

      this.setConfig((config = {content: []}) => ({
        ...config,
        theme: {
          ...(config?.theme ?? {}),
          extend: {...(config?.theme?.extend ?? {}), ...value},
        },
      }))

      return this
    }

    const [key, value] = params
    this.setConfig(config => ({
      ...config,
      theme: {
        ...(config?.theme ?? {}),
        extend: {...(config?.theme?.extend ?? {}), [key]: value},
      },
    }))

    return this
  }

  public extend = this.extendTheme

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
    imports:
      | Array<
          | `${keyof ThemeConfig & string}.${string}`
          | `${keyof ThemeConfig & string}`
        >
      | boolean = true,
  ) {
    const makeStaticModule = (key: `${keyof ThemeConfig & string}`) => {
      this.logger.log(`@tailwind/${key}`, `generating module`)

      const value = get(this.resolvedConfig.theme, key)
      return `export default ${JSON.stringify(value)};`
    }

    this.app.hooks.action(`config.after`, async bud => {
      this.resolveConfig()

      const importableKeys = Array.isArray(imports)
        ? imports
        : Object.keys(this.resolvedConfig.theme)

      const modules = importableKeys.reduce(
        (acc, key) => ({
          ...acc,
          [bud.path(`@src`, `__bud`, `@tailwind`, `${key}.mjs`)]:
            makeStaticModule(key as `${keyof ThemeConfig & string}`),
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
  public getContent() {
    return this.config?.content
  }

  @bind
  public getPlugins() {
    return this.config?.plugins
  }

  @bind
  public getTheme<K extends keyof ThemeConfig & string>(key?: K) {
    return key ? this.config.theme?.[key] : this.config.theme
  }

  @bind
  public resolveConfig() {
    this.setResolvedConfig({...resolveConfig({...this.config})})
    return this.resolvedConfig
  }

  /**
   * Resolve a tailwind config value
   */
  @bind
  public resolveThemeValue<
    K extends
      | `${keyof ThemeConfig & string}.${string}`
      | `${keyof ThemeConfig & string}`
  >(key: K, extendedOnly?: boolean): Config[K] {
    if (extendedOnly) {
      if (!this.config?.theme?.extend)
        throw new Error(
          `@roots/bud-tailwindcss: using \`extendOnly\` with ${key} but \`theme.extend\` is not defined in your tailwind config.`,
        )

      const value = this.config.theme.extend[key]
      if (!value) {
        throw new Error(
          `@roots/bud-tailwindcss: using \`extendOnly\` with ${key} but \`theme.extend.${key}\` is not defined in your tailwind config.`,
        )
      }

      return isFunction(value) ? value(pluginUtils) : value
    }

    const value = get(this.resolveConfig()?.theme, key)

    if (!value) {
      throw new Error(
        `@roots/bud-tailwindcss: ${key} is not a valid tailwind theme key.`,
      )
    }

    return value
  }

  @bind
  public setContent(content: Config[`content`]) {
    this.setConfig((config = {content: []}) => ({...config, content}))
    return this
  }

  @bind
  public setPlugins(plugins: Config[`plugins`]) {
    this.setConfig((config = {content: []}) => ({
      ...config,
      plugins,
    }))
    return this
  }

  @bind
  public setTheme<
    K extends `${keyof ThemeConfig & string}` | undefined,
    V extends
      | ((theme: Partial<ThemeConfig>) => Partial<ThemeConfig>)
      | Partial<ThemeConfig>,
    VK extends
      | ((theme: Partial<ThemeConfig>[K]) => Partial<ThemeConfig>[K])
      | Partial<ThemeConfig>[K],
  >(...params: [K, VK] | [V]) {
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

  /**
   * Source tailwind config module and path
   */
  @bind
  public async sourceConfig(): Promise<void> {
    try {
      const config = this.app.context.files[`tailwind.config`]
      if (!config) return

      config.path && this.setConfigPath(config.path)
      config.module && this.setConfig({...(await config.module())})
      this.resolveConfig()
    } catch (error) {
      this.logger.error(error)
    }
  }
}

export {
  BudTailwindOptionsApi,
  type BudTailwindOptionsPublicInterface,
  type Options,
}
