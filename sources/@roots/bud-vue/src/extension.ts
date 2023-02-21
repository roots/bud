import {join} from 'node:path'

import type {Bud} from '@roots/bud-framework'
import {Extension} from '@roots/bud-framework/extension'
import {
  bind,
  dependsOnOptional,
  expose,
  label,
  options,
} from '@roots/bud-framework/extension/decorators'
import {deprecated} from '@roots/bud-support/decorators'
import parseSemver from '@roots/bud-support/parse-semver'
import type {
  RuleSetRule,
  WebpackPluginInstance,
} from '@roots/bud-support/webpack'

interface Options {
  runtimeOnly: boolean
}

/**
 * Vue configuration
 */
@label(`@roots/bud-vue`)
@options({runtimeOnly: true})
@dependsOnOptional([
  `@roots/bud-postcss`,
  `@roots/bud-sass`,
  `@roots/bud-typescript`,
])
@expose(`vue`)
export default class Vue extends Extension<
  Options,
  WebpackPluginInstance
> {
  /**
   * Resolved version
   */
  public declare version: string

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

  /**
   * `register` callback
   */
  @bind
  public override async register(bud: Bud) {
    bud.build
      .setLoader(`vue`, await this.resolve(`vue-loader`, import.meta.url))
      .setItem(`vue`, {ident: `vue`, loader: `vue`})

    bud.build
      .setLoader(
        `vue-style`,
        await this.resolve(`vue-style-loader`, import.meta.url),
      )
      .setItem(`vue-style`, {
        ident: `vue-style`,
        loader: `vue-style`,
      })
  }

  /**
   * `boot` callback
   */
  @bind
  public override async boot(bud: Bud) {
    bud.alias(this.resolveAlias)

    bud.build.rules.css?.setUse((items = []) => [`vue-style`, ...items])
    bud.build.rules.sass?.setUse((items = []) => [`vue-style`, ...items])
    bud.build.items.precss?.setOptions({esModule: false})

    bud.typescript?.set(`appendTsSuffixTo`, [
      bud.hooks.filter(`pattern.vue`),
    ])

    bud.hooks.fromMap({
      'build.module.rules.before': this.moduleRulesBefore,
      'build.module.rules.oneOf': this.moduleRulesOneOf,
      'build.resolve.extensions': (ext = new Set()) => ext.add(`.vue`),
    })
  }

  /**
   * `make` callback
   */
  @bind
  public override async make(): Promise<WebpackPluginInstance> {
    const {VueLoaderPlugin} = await import(`vue-loader`)
    return new VueLoaderPlugin()
  }

  /**
   * `build.module.rules.before` callback
   */
  @bind
  public moduleRulesBefore(
    ruleset: Array<RuleSetRule> = [],
  ): Array<RuleSetRule> {
    const vue = this.app.build
      .makeRule()
      .setTest(this.app.hooks.filter(`pattern.vue`))
      .setInclude([this.app.path(`@src`)])
      .setUse([this.app.build.items.vue])
      .toWebpack()

    ruleset.push(vue, this.app.build.rules.css.toWebpack())

    if (this.app.typescript) {
      ruleset.push(this.app.build.rules.ts.toWebpack())
    }

    if (this.app.sass) {
      ruleset.push(this.app.build.rules.sass.toWebpack())
    }

    return ruleset
  }

  /**
   * `build.module.rules.before` callback
   */
  @bind
  public moduleRulesOneOf(
    ruleset: Array<RuleSetRule> = [],
  ): Array<RuleSetRule> {
    ruleset = ruleset.filter(
      ({test}) => !(test instanceof RegExp) || !`.css`.match(test),
    )

    if (this.app.typescript)
      ruleset = ruleset.filter(
        ({test}) => !(test instanceof RegExp) || `.ts`.match(test),
      )

    if (this.app.sass)
      ruleset = ruleset.filter(
        ({test}) => !(test instanceof RegExp) || `.scss`.match(test),
      )

    return ruleset
  }

  /**
   * `build.resolve.alias` callback
   */
  @bind
  public async resolveAlias(
    aliases = {},
  ): Promise<Record<string, string | Array<string>>> {
    const type = this.isVue2() ? `esm` : `esm-bundler`

    const vue = this.options.runtimeOnly
      ? join(`vue`, `dist`, `vue.runtime.${type}.js`)
      : join(`vue`, `dist`, `vue.${type}.js`)

    return {...aliases, vue}
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

    if (!this.version) return false

    return this.version?.startsWith(`2`)
  }
}
