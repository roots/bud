import {loaders} from '../util/loaders'
import {patterns} from '../util/patterns'
import type {Bud} from './../../types'

const eslint: Function = (bud: Bud): any => ({
  bud,
  enabled: bud?.state?.configs.eslint,
  enforce: 'pre',
  test: patterns.js,
  include: bud?.state?.paths.src,
  exclude: patterns.vendor,
  loader: loaders.eslint,
  options: {
    configFile: bud?.state?.configs.eslint,
    formatter: 'codeframe',
    failOnError: true,
  },
  output: {},

  make: function () {
    this.pre()

    this.output = this.enabled
      ? {
          enforce: this.enforce,
          test: this.test,
          include: this.include,
          exclude: this.exclude,
          loader: this.loader,
          options: this.options,
        }
      : {}

    this.post()

    return this.output
  },

  pre: function () {
    this.bud.hooks.call('pre_eslint', this)
  },

  post: function () {
    this.bud.hooks.call('post_eslint', this.output)
  },
})

export {eslint}
