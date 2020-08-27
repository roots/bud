import {optimize} from 'webpack'
const {LimitChunkCountPlugin} = optimize

import type {Extension} from './index'

const limitChunkCount: Extension = bud => ({
  bud,

  name: 'limit-chunk-count-plugin',

  make: function () {
    const enabled = this.bud.features.enabled('splitChunks')
    const chunks = this.bud.options.get('splitting.maxChunks')

    this.options = !enabled
      ? {maxChunks: 1}
      : chunks
      ? {maxChunks: chunks}
      : {}

    return new LimitChunkCountPlugin(this.options)
  },

  when: function () {
    return this.options
  },
})

export {limitChunkCount}
