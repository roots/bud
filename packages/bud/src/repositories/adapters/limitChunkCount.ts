import {optimize} from 'webpack'
const {LimitChunkCountPlugin} = optimize

import type {Extension} from './index'

const limitChunkCount: Extension = bud => ({
  bud,

  name: 'limit-chunk-count-plugin',

  setOptions: function () {
    const enabled = this.bud.features.enabled('splitting')
    const chunks = this.bud.options.get('splitting').maxChunks

    if (!enabled) {
      return {
        maxChunks: 1,
      }
    }

    if (chunks) {
      return {
        maxChunks: chunks,
      }
    }

    return null
  },

  make: function () {
    return new LimitChunkCountPlugin(this.options)
  },

  when: function () {
    return this.options
  },
})

export {limitChunkCount}
