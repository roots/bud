import {loaders} from '../util/loaders'
import type {Bud} from './../../types'

/**
 * Babel
 *
 * @type {function} babel
 * @return {object}
 */
const babel = (bud: Bud): any => ({
  bud,
  output: {},
  enabled: bud?.state?.features.babel,
  loader: loaders.babel,
  options: {
    ...bud?.state?.options.babel,
    cacheDirectory: true,
    cacheCompression: bud?.inProduction,
  },

  /**
   * Make babel rules
   */
  make: function () {
    this.pre()

    this.output = this.enabled
      ? {
          loader: this.loader,
          options: this.options,
        }
      : {}

    this.post()

    return this.output
  },

  /**
   * Hook: pre_babel
   */
  pre: function () {
    this.bud.hooks.call('pre_babel', this)
  },

  /**
   * Hook: post_babel
   */
  post: function () {
    this.bud.hooks.call('post_babel', this.output)
  },
})

export {babel}
