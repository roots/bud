import {entry} from './entry'
import {devServer} from './devServer'
import {externals} from './externals'
import {general} from './general'
import {rules} from './rules/index'
import {optimization} from './optimization'
import {output} from './output'
import {webpackResolve} from './webpackResolve'
import {plugins} from './plugins'
import type {Bud, BuilderController, RegisteredBuilder} from './types'

/**
 * Build - generates webpack configuration from bud.
 *
 * @param {Bud} bud
 * @return {BuilderController}
 */
const build = (bud: Bud): BuilderController => ({
  /**
   * The bud container.
   * @property {Bud} bud
   */
  bud,

  /**
   * The webpack config to be passed to the compiler.
   */
  config: {},

  /**
   * Builders to handle different webpack concerns.
   */
  builders: [
    ['entry', entry],
    ['output', output],
    ['rules', rules],
    ['devServer', devServer],
    ['plugins', plugins],
    ['resolve', webpackResolve],
    ['externals', externals],
    ['general', general],
  ],

  /**
   * Merge a set of configuration values into the final config.
   *
   * @property {Function} mergeConfig
   * @return {void}
   */
  mergeConfig: function (configValues): void {
    this.config = {
      ...this.config,
      ...configValues,
    }
  },

  /**
   * Generate config values from a builder
   * @property {Function} makeConfig
   * @return {object}
   */
  makeConfig: function () {
    this.bud.features.enabled('optimize') &&
      this.builders.push(['optimization', optimization])

    /** Hook: pre_webpack */
    this.doHook('pre', this.bud.options)

    /**
     * Map builder output to bud.builder.config property.
     */
    this.builders.map(([name, builder]: RegisteredBuilder) => {
      builder = this.bud.hooks.filter(
        `filter_webpack_${name}`,
        builder,
      )
      const builderInstance = builder(this.bud)

      this.preBuilderHook(name, this)
      this.builderOut = builderInstance.make()
      this.postBuilderHook(name, this.builderOut)

      this.mergeConfig(this.builderOut)

      delete this.builderOut
    })

    /** Hook: post_webpack */
    this.doHook('post', this.config)

    return this.config
  },

  /**
   * Top level hooks.
   */
  doHook: function (name, ...params) {
    this.bud.hooks.call(`${name}_webpack`, this, params)
  },

  /**
   * pre_{builder} hooks.
   * @property {Function} preBuilderHook
   */
  preBuilderHook: function (name: string, ...params) {
    this.bud.hooks.call(`pre_${name}`, params)
  },

  /**
   * post_{builder} hooks.
   * @property {Function} preBuilderHook
   */
  postBuilderHook: function (name: string, ...params) {
    this.bud.hooks.call(`post_${name}`, params)
  },
})

export {build}
