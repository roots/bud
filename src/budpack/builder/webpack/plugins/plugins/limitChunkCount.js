import {LimitChunkCountPlugin} from 'webpack'

const limitChunkCount = () => ({
  setOptions: function () {
    const maxChunks = !this.bud.features.splitting
      ? 1
      : this.bud.options.splitting.maxChunks
    this.options = {maxChunks}
  },
  make: function () {
    return new LimitChunkCountPlugin(this.options)
  },
  when: function () {
    return this.options?.maxChunks
  },
})

export {limitChunkCount}
