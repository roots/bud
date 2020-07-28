import {loaders} from '../util/loaders'
import {patterns} from '../util/patterns'
import type {Bud} from '../../types'

/**
 * node
 *
 * @type {function} node
 * @return {object}
 */
const node = (bud: Bud): any => ({
  bud,

  rule: {},

  /**
   * Make node rules
   */
  make: function () {
    this.pre()

    this.rule = {
      test: /\.node$/,
      loader: loaders.node,
    },

    this.post()

    return this.rule
  },

  /**
   * Hook: pre_node
   */
  pre: function () {
    this.bud.hooks.call('pre_node', this)
  },

  /**
   * Hook: post_node
   */
  post: function () {
    this.bud.hooks.call('post_node', this.rule)
  },
})

export {node}