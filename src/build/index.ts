import {devServer} from './devServer'
import {entry} from './entry'
import {externals} from './externals'
import {general} from './general'
import {rules} from './rules/index'
import {optimization} from './optimization'
import {output} from './output'
import {webpackResolve} from './webpackResolve'
import {plugins} from './plugins'
import type {Bud, BuilderController, RegisteredBuilder} from './types'

const build = (bud: Bud): BuilderController => ({
  bud,

  config: {},

  builders: [
    ['entry', entry],
    ['output', output],
    ['rules', rules],
    ['optimization', optimization],
    ['plugins', plugins],
    ['resolve', webpackResolve],
    ['externals', externals],
    ['devServer', devServer],
    ['general', general],
  ],

  mergeConfig: function (configValues) {
    this.config = {
      ...this.config,
      ...configValues,
    }
  },

  makeConfig: function () {
    this.doHook('pre', this.bud.state.options)

    this.builders.map(
      ([name, builder]: RegisteredBuilder) => {
        const builderInstance = builder(this.bud)

        this.preBuilderHook(name, this)
        this.builderOut = builderInstance.make()
        this.postBuilderHook(name, this.builderOut)

        this.mergeConfig(this.builderOut)
        delete this.builderOut
      },
    )

    this.doHook('post', this.config)

    return this.config
  },

  doHook: function (name, ...params) {
    this.bud.hooks.call(`${name}_webpack`, this, params)
  },

  preBuilderHook: function (name: string, ...params) {
    this.bud.hooks.call(`pre_${name}`, params)
  },

  postBuilderHook: function (name: string, ...params) {
    this.bud.hooks.call(`post_${name}`, params)
  },
})

export {build}
