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
import pluginUtils from 'tailwindcss/lib/util/pluginUtils.js'
import resolveConfig from 'tailwindcss/resolveConfig.js'
import type {Config, ThemeConfig} from 'tailwindcss/types/config.js'
import WebpackVirtualModules from 'webpack-virtual-modules'

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
  public get path(): string | undefined {
    if (!this.app.context.config) return

    return Object.entries(this.app.context.config)?.find(([k, v]) =>
      k.startsWith(`tailwind.config`),
    )?.[1]?.absolutePath
  }

  /**
   * Tailwind config (source)
   */
  public declare source: Config | undefined

  public get config() {
    return {...(resolveConfig(this.source) ?? {})}
  }

  /**
   * Resolved paths
   */
  public dependencies: {tailwindcss: string; nesting: string} = {
    tailwindcss: null,
    nesting: null,
  }

  /**
   * Resolve a tailwind config value
   */
  @bind
  public resolveThemeValue<K extends `${keyof ThemeConfig & string}`>(
    key: K,
    extendedOnly?: boolean,
  ): Config[K] {
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
   * {@link Extension.register}
   */
  @bind
  public override async register(_bud: Bud) {
    this.dependencies.tailwindcss = await this.resolve(`tailwindcss`)
    this.dependencies.nesting = await this.resolve(
      `tailwindcss/nesting/index.js`,
    )

    if (this.path) {
      try {
        this.source = await import(this.path).then(m => m.default)
        return
      } catch (error) {}
    }

    this.source = {
      ...(await import(`tailwindcss/defaultConfig.js`).then(
        m => m.default,
      )),
    }
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
