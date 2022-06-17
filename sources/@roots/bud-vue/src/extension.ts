import {Extension} from '@roots/bud-framework/extension'
import {
  bind,
  dependsOnOptional,
  label,
  options,
} from '@roots/bud-framework/extension/decorators'
import parseSemver from 'parse-semver'
import type {Configuration, RuleSetRule} from 'webpack'

type Aliases = Configuration['resolve']['alias']
type Options = {runtimeOnly: boolean}

/**
 * Vue support
 *
 * @public
 */
@label('@roots/bud-vue')
@options({runtimeOnly: true})
@dependsOnOptional(['@roots/bud-postcss', '@roots/bud-sass'])
export default class Vue extends Extension<Options, null> {
  @bind
  public async boot() {
    await this.addLoader()
    await this.addStyleLoader()

    this.app.hooks.on('build.module.rules.before', this.moduleRulesBefore)
    this.app.hooks.on('build.resolve.extensions', ext => ext.add('.vue'))
    this.app.hooks.async('build.resolve.alias', this.resolveAlias)
  }

  @bind
  public async addLoader() {
    const loader = await this.resolve('vue-loader')
    const {VueLoaderPlugin: Plugin} = await this.import('vue-loader')

    this.app.build.setLoader('vue', loader)
    this.app.build.setItem('vue', {loader: 'vue'})

    await this.app.extensions.add({
      label: 'vue-loader-plugin',
      plugin: Plugin,
    })
  }

  /**
   * Add `vue-style-loader`
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public async addStyleLoader() {
    const loader = await this.resolve('vue-style-loader')
    this.app.build.setLoader('vue-style', loader)
    this.app.build.setItem('vue-style', {loader: 'vue-style'})
    this.app.build.rules.css.setUse(items => ['vue-style', ...items])
    this.app.build.rules.sass?.setUse(items => ['vue-style', ...items])
  }

  @bind
  public moduleRulesBefore(
    ruleset: Array<RuleSetRule>,
  ): Array<RuleSetRule> {
    const rule = this.app.build.makeRule({
      test: this.app.hooks.filter('pattern.vue'),
      use: items => [`vue`, ...items],
    })

    return [...(ruleset ?? []), rule.toWebpack()]
  }

  @bind
  public async resolveAlias(aliases: Aliases) {
    const isVue2 = await this.isVue2()

    isVue2 &&
      this.logger.log('configuring for vue2 based on project dependencies')

    const type = isVue2 ? 'esm' : 'esm-bundler'

    const vue = this.options.runtimeOnly
      ? `vue/dist/vue.runtime.${type}.js`
      : `vue/dist/vue.${type}.js`

    return Object.assign(aliases, {vue})
  }

  @bind
  protected async isVue2() {
    const manifest = await this.app.module.readManifest('vue')
    this.logger.log('vue manifest:', manifest)
    return parseSemver(`vue@${manifest.version}`).version.startsWith('2')
  }
}
