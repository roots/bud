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
  optionsApi: boolean
  productionDevtools: boolean
  runtimeOnly: boolean
  version: string
}

/**
 * Vue configuration
 */
@label(`@roots/bud-vue`)
@options<Options>({
  optionsApi: true,
  productionDevtools: false,
  runtimeOnly: true,
  version: `^3`,
})
@expose(`vue`)
export default class BudVue extends Extension<
  Options,
  WebpackPluginInstance
> {
  /**
   * ## vue.optionsApi
   *
   * - Get value of __VUE_OPTIONS_API__ with {@link BudVue.getOptionsApi}
   * - Set value of __VUE_OPTIONS_API__ with {@link BudVue.setOptionsApi}
   *
   * This is automatically disabled for vue 2.x.x users.
   *
   * @see {@link https://github.com/vuejs/core/tree/v3.4.0-alpha.4/packages/vue#bundler-build-feature-flags}
   *
   * @readonly
   * @default true if vue version is 3.x.x
   * @default false if vue version is 2.x.x
   */
  public declare readonly optionsApi: boolean
  /**
   * ## vue.getOptionsApi
   *
   * Get value of {@link BudVue.optionsApi | __VUE_OPTIONS_API__}
   *
   * @see {@link https://github.com/vuejs/core/tree/v3.4.0-alpha.4/packages/vue#bundler-build-feature-flags}
   */
  public declare getOptionsApi: () => boolean
  /**
   * ## vue.setOptionsApi
   *
   * Set value of {@link BudVue.optionsApi | __VUE_OPTIONS_API__}
   *
   * @see {@link https://github.com/vuejs/core/tree/v3.4.0-alpha.4/packages/vue#bundler-build-feature-flags}
   */
  public declare setOptionsApi: (enabled: boolean) => this

  /**
   * ## vue.productionDevtools
   *
   * - Get value of __VUE_PROD_DEVTOOLS__ with {@link BudVue.getProductionDevtools}
   * - Set value of __VUE_PROD_DEVTOOLS__ with {@link BudVue.setProductionDevtools}
   *
   * @see {@link https://github.com/vuejs/core/tree/v3.4.0-alpha.4/packages/vue#bundler-build-feature-flags}
   *
   * @readonly
   * @default false
   */
  public declare readonly productionDevtools: boolean
  /**
   * ## vue.getProductionDevtools
   *
   * Get value of {@link BudVue.productionDevtools | __VUE_PROD_DEVTOOLS__}
   *
   * @see {@link https://github.com/vuejs/core/tree/v3.4.0-alpha.4/packages/vue#bundler-build-feature-flags}
   */
  public declare getProductionDevtools: () => boolean
  /**
   * ## vue.setProductionDevtools
   *
   * Set value of {@link BudVue.productionDevtools | __VUE_PROD_DEVTOOLS__}
   *
   * @see {@link https://github.com/vuejs/core/tree/v3.4.0-alpha.4/packages/vue#bundler-build-feature-flags}
   */
  public declare setProductionDevtools: (enabled: boolean) => this

  /**
   * ## vue.getRuntimeOnly
   *
   * Get the runtimeOnly option.
   *
   * @see {@link https://vuejs.org/guide/scaling-up/tooling.html#note-on-in-browser-template-compilation}
   */
  public declare getRuntimeOnly: () => boolean
  /**
   * ## vue.setRuntimeOnly
   *
   * Set the runtimeOnly option.
   *
   * @see {@link https://vuejs.org/guide/scaling-up/tooling.html#note-on-in-browser-template-compilation}
   */
  public declare setRuntimeOnly: (enabled: boolean) => this

  /**
   * ## vue.version
   *
   * The version of Vue to use.
   *
   * @readonly
   * @default `^3`
   */
  public declare readonly version: string

  /**
   * ## vue.getVersion
   *
   * Get the value of {@link BudVue.version}
   */
  public declare getVersion: () => string

  /**
   * ## vue.setVersion
   *
   * Set the value of {@link BudVue.version}. You can use any semver compatible string or number
   *
   * This will also set {@link BudVue.optionsApi} to false if the version is 2.x.x.
   */
  @bind
  public setVersion(version: number | string): BudVue {
    version = `${version}`.startsWith(`vue@`)
      ? `${version}`
      : `vue@${version}`
    this.set(`version`, parseSemver(version).version)

    this.logger.log(`Set vue version to ${this.getVersion()}`)

    if (this.getVersion().startsWith(`2`)) {
      this.setOptionsApi(false)
      this.logger.log(`Set vue optionsApi to ${this.getOptionsApi()}`)
    }

    return this
  }

  /**
   * {@link Extension.buildBefore}
   */
  @bind
  public override async buildBefore(bud: Bud) {
    bud.build.rules.css?.setUse((items = []) => [`vue-style`, ...items])
    bud.build.rules.sass?.setUse((items = []) => [`vue-style`, ...items])
    bud.build.items.precss?.setOptions({esModule: false})

    bud.alias(this.resolveAlias)

    /**
     * @see {@link https://github.com/vuejs/core/tree/v3.4.0-alpha.4/packages/vue#bundler-build-feature-flags}
     */
    bud.define({
      __VUE_OPTIONS_API__: this.getOptionsApi(),
      __VUE_PROD_DEVTOOLS__: this.getProductionDevtools(),
    })
  }

  /**
   * {@link Extension.register}
   */
  @bind
  public override async register(bud: Bud) {
    const type = [`dependencies`, `devDependencies`].find(
      key => bud.context.manifest?.[key]?.vue,
    )
    this.setVersion(type ? bud.context.manifest?.[type]?.vue : `^3`)

    const loader = await this.resolve(`vue-loader`, import.meta.url)
    if (!loader) return this.logger.error(`vue-loader not found`)

    const style = await this.resolve(`vue-style-loader`, import.meta.url)
    if (!style) return this.logger.error(`vue-style-loader not found`)

    bud.hooks
      .on(`build.resolveLoader.alias`, (aliases = {}) => ({
        ...aliases,
        [`vue-loader`]: loader,
        [`vue-style-loader`]: style,
      }))
      .hooks.on(`build.resolve.extensions`, (extensions = new Set()) =>
        extensions.add(`.vue`),
      )

    bud.build
      .setLoader(`vue`, loader)
      .setLoader(`vue-style`, style)
      .setItem(`vue`, {ident: `vue`, loader: `vue`})
      .setItem(`vue-style`, {ident: `vue-style`, loader: `vue-style`})

    bud.hooks.on(`build.module.rules.before`, (rules = []) => [
      ...rules,
      {
        include: [bud.path(`@src`)],
        test: bud.hooks.filter(`pattern.vue`),
        use: [bud.build.items.vue.toWebpack()],
      },
    ])

    await bud.extensions.add({
      label: `vue-loader`,
      make: async () => {
        const {VueLoaderPlugin} = await this.import(
          `vue-loader`,
          import.meta.url,
          {raw: true},
        )
        return new VueLoaderPlugin()
      },
    })
  }

  /**
   * {@link Extension.boot}
   */
  @bind
  public override async boot(bud: Bud) {
    /**
     * @see {@link https://vue-loader.vuejs.org/guide/pre-processors.html#typescript}
     */
    bud.typescript?.setAppendTsSuffixTo([bud.hooks.filter(`pattern.vue`)])
  }

  /**
   * ## vue.resolveAlias
   *
   * This is a callback for {@link Bud.alias}, you should not need to call this directly.
   *
   * Here are the ways to do whatever you are trying to accomplish:
   *
   * - To use the runtime only build, use {@link BudVue.setRuntimeonly} to set the runtimeOnly option to true.
   * - To use the full build, use {@link BudVue.setRuntimeonly} to set the runtimeOnly option to false.
   * - To use the esm export, use {@link BudVue.setVersion} to set the version to 3.x.x.
   * - To use the esm-bundler export, use {@link BudVue.setVersion} to set the version to 2.x.x.
   */
  @bind
  public async resolveAlias(
    aliases = {},
  ): Promise<Record<string, Array<string> | string>> {
    const type = this.getVersion().startsWith(`2`) ? `esm` : `esm-bundler`

    const relPath = this.getRuntimeOnly()
      ? join(`vue`, `dist`, `vue.runtime.${type}.js`)
      : join(`vue`, `dist`, `vue.${type}.js`)

    await this.resolve(relPath, import.meta.url)
      .catch(e => {
        throw e
      })
      .then(path => {
        aliases[`vue$`] = path
        this.logger.log(`Set vue alias to ${path}`)
      })

    return aliases
  }

  /**
   * Set {@link BudVue.runtimeOnly}
   *
   * @deprecated Use {@link BudVue.setRuntimeonly} instead
   *
   * @example
   * ```js
   * bud.vue.setRuntimeonly(true)
   * ```
   */
  @bind
  @deprecated(`bud.vue`, `Use bud.vue.setRuntimeOnly instead`, [
    [`Enable runtimeOnly`, `bud.vue.setRuntimeOnly(true)`],
    [`Disable runtimeOnly`, `bud.vue.setRuntimeOnly(false)`],
  ])
  public runtimeOnly(enabled: Options[`runtimeOnly`] = true): this {
    this.set(`runtimeOnly`, enabled)
    return this
  }
}
