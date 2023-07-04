import type {Bud} from '@roots/bud-framework'
import type {WebpackPluginInstance} from '@roots/bud-framework/config'

import {join} from 'node:path'

import {Extension} from '@roots/bud-framework/extension'
import {
  bind,
  expose,
  label,
  options,
} from '@roots/bud-framework/extension/decorators'
import {deprecated} from '@roots/bud-support/decorators'
import parseSemver from '@roots/bud-support/parse-semver'

interface Options {
  runtimeOnly: boolean
}

/**
 * Vue configuration
 */
@label(`@roots/bud-vue`)
@options<Options>({runtimeOnly: true})
@expose(`vue`)
export default class Vue extends Extension<
  Options,
  WebpackPluginInstance
> {
  public declare getRuntimeOnly: () => boolean

  public declare setRuntimeOnly: (enabled: boolean) => this
  /**
   * Resolved version
   */
  public declare version: string

  /**
   * {@link Extension.buildBefore}
   */
  @bind
  public override async buildBefore(bud: Bud) {
    bud.build.rules.css?.setUse((items = []) => [`vue-style`, ...items])
    bud.build.rules.sass?.setUse((items = []) => [`vue-style`, ...items])
    bud.build.items.precss?.setOptions({esModule: false})

    const {VueLoaderPlugin} = await import(`vue-loader`)
    bud.webpackConfig(config => {
      config.module.rules = [
        {
          include: [bud.path(`@src`)],
          test: bud.hooks.filter(`pattern.vue`),
          use: [bud.build.items.vue.toWebpack()],
        },
        ...config.module.rules.flatMap(rule =>
          typeof rule === `object` && `oneOf` in rule ? rule.oneOf : rule,
        ),
      ]

      config.plugins.push(new VueLoaderPlugin())

      return config
    })
  }

  /**
   * {@link Extension.configAfter}
   */
  @bind
  public override async configAfter(bud: Bud) {
    bud.alias(this.resolveAlias)
    bud.typescript?.setAppendTsSuffixTo([bud.hooks.filter(`pattern.vue`)])
  }

  /**
   * Returns true if user has installed a 2.x.x version of vue
   */
  @bind
  public isVue2(): boolean {
    if (!this.version) {
      const version =
        this.app.context.manifest?.dependencies?.vue ??
        this.app.context.manifest?.devDependencies?.vue

      if (version) this.version = parseSemver(`vue@${version}`).version
    }

    return !this.version ? false : this.version?.startsWith(`2`)
  }

  /**
   * {@link Extension.register}
   */
  @bind
  public override async register({build, hooks}: Bud) {
    const loader = await this.resolve(`vue-loader`, import.meta.url)
    if (!loader) return this.logger.error(`vue-loader not found`)

    const style = await this.resolve(`vue-style-loader`, import.meta.url)
    if (!style) return this.logger.error(`vue-style-loader not found`)

    hooks.on(`build.resolveLoader.alias`, (aliases = {}) => ({
      ...aliases,
      [`vue-loader`]: loader,
      [`vue-style-loader`]: style,
    }))

    build
      .setLoader(`vue`, await this.resolve(`vue-loader`, import.meta.url))
      .setLoader(
        `vue-style`,
        await this.resolve(`vue-style-loader`, import.meta.url),
      )
      .setItem(`vue`, {ident: `vue`, loader: `vue`})
      .setItem(`vue-style`, {ident: `vue-style`, loader: `vue-style`})

    hooks.on(`build.resolve.extensions`, (extensions = new Set()) =>
      extensions.add(`.vue`),
    )
  }

  /**
   * `build.resolve.alias` callback
   */
  @bind
  public async resolveAlias(
    aliases = {},
  ): Promise<Record<string, Array<string> | string>> {
    const type = this.isVue2() ? `esm` : `esm-bundler`
    const importPath =
      this.options.runtimeOnly && !this.isVue2()
        ? join(`vue`, `dist`, `vue.runtime.${type}.js`)
        : join(`vue`, `dist`, `vue.${type}.js`)
    aliases[`vue`] = await this.resolve(importPath, import.meta.url)

    return aliases
  }

  /**
   * Set `runtimeOnly` option
   *
   * @deprecated Use {@link Extension.set} instead
   * @example
   * ```js
   * bud.vue.set('runtimeOnly', false)
   * ```
   */
  @bind
  @deprecated(`bud.vue`, `Use bud.vue.set instead`, [
    [`Enable runtimeOnly`, `bud.vue.set('runtimeOnly', true)`],
    [`Disable runtimeOnly`, `bud.vue.set('runtimeOnly', false)`],
  ])
  public runtimeOnly(enabled: Options[`runtimeOnly`] = true): this {
    this.set(`runtimeOnly`, enabled)
    return this
  }
}
