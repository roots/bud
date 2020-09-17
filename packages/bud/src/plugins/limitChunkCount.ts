import {LimitChunkCountPlugin} from './externals'
import {BudInterface, Plugin} from '../'

const limitChunkCount: Plugin = (bud: BudInterface) => ({
  bud,

  make: function () {
    const enabled = this.bud.features.enabled('split')
    const chunks = this.bud.options.get('split.maxChunks')

    this.options = !enabled
      ? {maxChunks: 1}
      : chunks
      ? {maxChunks: chunks}
      : {}

    return new LimitChunkCountPlugin(this.options)
  },

  when: function () {
    return this.options ? true : false
  },
})

export {limitChunkCount as default}
