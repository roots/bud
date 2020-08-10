import {entry} from './entry'
import {devServer} from './devServer'
import {externals} from './externals'
import {general} from './general'
import {rules} from './rules'
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
    ['output', output],
    ['entry', entry],
    ['module', rules],
    ['plugins', plugins],
    ['resolve', webpackResolve],
    ['externals', externals],
    ['devServer', devServer],
    ['general', general],
  ],

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
     * Build
     */
    this.builders.map(([name, builder]: RegisteredBuilder) => {
      this.final = {
        ...this.final,
        ...builder(this.bud).make(),
      }
    })

    /**
     * Return final config object
     */
    this.final = this.bud.hooks.filter('webpack_final', this.final)
    return this.final
  },
})

export {build}
