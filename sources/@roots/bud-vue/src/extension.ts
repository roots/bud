import type {Bud} from '@roots/bud-framework'
import {Extension} from '@roots/bud-framework/extension'
import {
  bind,
  dependsOnOptional,
  label,
  options,
} from '@roots/bud-framework/extension/decorators'
import parseSemver from 'parse-semver'
import type {Configuration, RuleSetRule} from 'webpack'

type Options = {runtimeOnly: boolean}

/**
 * Vue support
 *
 * @public
 * @decorator `@label`
 * @decorator `@options`
 * @decorator `@dependsOnOptional`
 */
@label(`@roots/bud-vue`)
@options({runtimeOnly: true})
@dependsOnOptional([`@roots/bud-postcss`, `@roots/bud-sass`])
export default class Vue extends Extension<Options, null> {
  public loader: string

  public version: string

  @bind
  public async register() {
    this.loader = await this.resolve(`vue-loader`)
  }

  /**
   * `afterConfig` callback
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public async boot() {
    await this.addLoader()
    await this.addStyleLoader()

    this.app.hooks
      .fromMap({
        [`build.module.rules.before`]: this.moduleRulesBefore,
        [`build.resolve.extensions`]: ext => ext.add(`.vue`),
      })
      .hooks.async(`build.resolve.alias`, this.resolveAlias)
  }

  /**
   * Add `vue-loader`
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public async addLoader(): Promise<this> {
    this.app.build.setLoader(`vue`, this.loader)
    this.app.build.setItem(`vue`, {loader: `vue`})

    const {VueLoaderPlugin: Plugin} = await this.import(`vue-loader`)
    await this.app.extensions.add({
      label: `vue-loader-plugin`,
      plugin: Plugin,
    })

    return this
  }

  /**
   * Add `vue-style-loader`
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public async addStyleLoader(): Promise<this> {
    this.app.build
      .setLoader(`vue-style-loader`)
      .setItem(`vue-style-loader`)

    this.app.build.rules.css.setUse(items => [
      `vue-style-loader`,
      ...items,
    ])
    this.app.build.rules.sass?.setUse(items => [
      `vue-style-loader`,
      ...items,
    ])
    this.app.build.items.precss.setOptions({esModule: false})

    return this
  }

  /**
   * `build.module.rules.before` callback
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public moduleRulesBefore(
    ruleset: Array<RuleSetRule>,
  ): Array<RuleSetRule> {
    const rule = this.app.build
      .makeRule()
      .setTest(({hooks}) => hooks.filter(`pattern.vue`))
      .setInclude([app => app.path(`@src`)])
      .setUse(items => [`vue`, ...items])

    return [rule.toWebpack(), ...(ruleset ?? [])]
  }

  /**
   * `build.resolve.alias` callback
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public async resolveAlias(aliases: Configuration['resolve']['alias']) {
    let isVue2 = false

    try {
      isVue2 = await this.isVue2(this.app)
    } catch (e) {}

    isVue2 &&
      this.logger.log(`configuring for vue2 based on project dependencies`)

    const type = isVue2 ? `esm` : `esm-bundler`

    const vue = this.options.runtimeOnly
      ? `vue/dist/vue.runtime.${type}.js`
      : `vue/dist/vue.${type}.js`

    return Object.assign(aliases, {vue})
  }

  /**
   * Returns true if user has installed a 2.x.x version of vue
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public async isVue2(bud: Bud): Promise<boolean> {
    let version = this.version

    if (!version)
      version =
        bud.context.manifest?.dependencies?.vue ??
        bud.context.manifest?.devDependencies?.vue ??
        (await bud.module.readManifest(`vue`).then(({version}) => version))

    if (version) this.version = parseSemver(`vue@${version}`).version

    return this.version?.startsWith(`2`)
  }
}
