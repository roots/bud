import type {Bud} from '@roots/bud-framework'
import {Extension} from '@roots/bud-framework/extension'
import {
  bind,
  dependsOnOptional,
  expose,
  label,
  options,
} from '@roots/bud-framework/extension/decorators'
import parseSemver from '@roots/bud-support/parse-semver'
import type {
  RuleSetRule,
  WebpackPluginInstance,
} from '@roots/bud-support/webpack'

interface Options {
  runtimeOnly: boolean
}

/**
 * Vue support
 *
 * @public
 * @decorator `@label`
 * @decorator `@options`
 * @decorator `@dependsOnOptional`
 * @decorator `@expose`
 */
@label(`@roots/bud-vue`)
@options({runtimeOnly: true})
@dependsOnOptional([`@roots/bud-postcss`, `@roots/bud-sass`])
@expose(`vue`)
export default class Vue extends Extension<
  Options,
  WebpackPluginInstance
> {
  /**
   * Loader path
   * @public
   */
  public declare loader: string

  /**
   * Style loader path
   * @public
   */
  public declare styleLoader: string

  /**
   * Resolved version
   * @public
   */
  public declare version: string

  /**
   * Set `runtimeOnly` option
   *
   * @param enabled - {@link Options.runtimeOnly}
   * @returns {Vue}
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public runtimeOnly(enabled: Options[`runtimeOnly`] = true): this {
    this.setOption(`runtimeOnly`, enabled)
    return this
  }

  /**
   * `register` callback
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public override async register() {
    this.loader = await this.resolve(`vue-loader`, import.meta.url)
    this.styleLoader = await this.resolve(
      `vue-style-loader`,
      import.meta.url,
    )
  }

  /**
   * `boot` callback
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public override async boot(bud: Bud) {
    bud.build
      .setLoader(`vue`, this.loader)
      .setItem(`vue`, {ident: `vue`, loader: `vue`})
      .setLoader(`vue-style-loader`, this.styleLoader)
      .setItem(`vue-style-loader`, {ident: `vue-style`, loader: `vue-style-loader`})

    bud.build.rules.css?.setUse((items = []) => [
      `vue-style-loader`,
      ...items,
    ])
    bud.build.rules.sass?.setUse((items = []) => [
      `vue-style-loader`,
      ...items,
    ])
    bud.build.items.precss?.setOptions({esModule: false})
    bud.hooks.fromMap({
      'build.module.rules.before': this.moduleRulesBefore,
      'build.resolve.extensions': (ext = new Set()) => ext.add(`.vue`),
    })

    bud.alias(this.resolveAlias)
  }

  /**
   * `make` callback
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public override async make(): Promise<WebpackPluginInstance> {
    const {VueLoaderPlugin} = await import(`vue-loader`)
    return new VueLoaderPlugin()
  }

  /**
   * `build.module.rules.before` callback
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public moduleRulesBefore(
    ruleset: Array<RuleSetRule> = [],
  ): Array<RuleSetRule> {
    return [
      this.app.build
        .makeRule()
        .setTest(({hooks}: Bud) => hooks.filter(`pattern.vue`))
        .setInclude([app => app.path(`@src`)])
        .setUse((items = []) => [`vue`, ...items])
        .toWebpack(),
      ...ruleset,
    ]
  }

  /**
   * `build.resolve.alias` callback
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public async resolveAlias(
    aliases = {},
  ): Promise<Record<string, string | Array<string>>> {
    const type = this.isVue2() ? `esm` : `esm-bundler`

    const vue = this.options.runtimeOnly
      ? `vue/dist/vue.runtime.${type}.js`
      : `vue/dist/vue.${type}.js`

    return {...aliases, vue}
  }

  /**
   * Returns true if user has installed a 2.x.x version of vue
   *
   * @public
   * @decorator `@bind`
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
