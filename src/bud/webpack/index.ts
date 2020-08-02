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

const build = (bud: Bud): BuilderController => ({
  /**
   * The bud container.
   */
  bud,

  /**
   * The final webpack config.
   */
  final: {},

  /**
   * Builders webpack concerns.
   */
  builders: [
    ['entry', entry],
    ['output', output],
    ['rules', rules],
    ['plugins', plugins],
    ['resolve', webpackResolve],
    ['externals', externals],
    ['general', general],
  ],

  /**
   * Merge values into the final config.
   */
  merge: function (values): void {
    this.final = {
      ...this.final,
      ...values,
    }
  },

  /**
   * Generate values from builders
   */
  make: function () {
    /**
     * Conditionally enabled: optimization
     */
    this.bud.features.enabled('optimize') &&
      this.builders.push(['optimization', optimization])

    /**
     * Conditionally enabled: devServer
     */
    this.bud.options.has('dev') &&
      this.builders.push(['devServer', devServer])

    /**
     * Build
     */
    this.builders.map(([name, builder]: RegisteredBuilder) => {
      const builderFn = this.bud.hooks.filter(`webpack_builder_${name}`, builder)
      const output = this.bud.hooks.filter(`webpack_builder_${name}_final`, builderFn(this.bud).make())

      output && this.merge(output)
    })

    /**
     * Return final config object
     */
    return this.bud.hooks.filter('webpack_final', this.final)
  },
})

export {build}
