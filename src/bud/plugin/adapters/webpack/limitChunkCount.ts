import {optimize} from 'webpack'
const {LimitChunkCountPlugin} = optimize
import type {WebpackAdapter} from './types'

const limitChunkCount: WebpackAdapter = () => ({
  setOptions: function () {
    const enabled = this.bud.state.features.splitting
    const chunks = this.bud.state.options.splitting.maxChunks

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
