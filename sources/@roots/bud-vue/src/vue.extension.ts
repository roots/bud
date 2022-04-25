import {Extension} from '@roots/bud-framework'
import {bind, options} from '@roots/bud-framework/extension/decorators'
import {parseSemver} from '@roots/bud-support'
import {Configuration, RuleSetRule} from 'webpack'

type Aliases = Configuration['resolve']['alias']
type Options = {runtimeOnly: boolean}

/**
 * Vue support
 *
 * @public
 */
@options({runtimeOnly: true})
export class Vue extends Extension<Options, null> {
  public label = '@roots/bud-vue'

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
    const loader = this.resolve('vue-loader')
    const {VueLoaderPlugin: Plugin} = await this.import('vue-loader')

    this.app.build.setLoader('vue', loader)
    this.app.build.setItem('vue', {loader: 'vue'})

    await this.app.extensions.add({
      label: 'vue-loader-plugin',
      make: () => new Plugin(),
    })
  }

  @bind
  public async addStyleLoader() {
    this.app.build.setLoader('vue-style', this.resolve('vue-style-loader'))
    this.app.build.setItem('vue-style', {loader: 'vue-style'})
    this.app.build.rules.css.setUse(items => ['vue-style', ...items])
  }

  @bind
  public moduleRulesBefore(ruleset: Array<RuleSetRule>) {
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
    const manifest = await this.app.module.readManifest([
      'vue',
      [this.path, 'vue'],
    ])

    return parseSemver(`vue@${manifest.version}`).version.startsWith('2')
  }
}
