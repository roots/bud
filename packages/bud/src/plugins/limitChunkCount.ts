import Bud from '@roots/bud-types'
import {LimitChunkCountPlugin} from './externals'

const limitChunkCount: Bud.Plugin.Factory = bud => ({
  bud,

  make: function () {
    return new LimitChunkCountPlugin(
      this.bud.options.get('plugins.limitChunkCount.maxChunks'),
    )
  },

  when: function () {
    return (
      this.bud.features.enabled('split') &&
      this.bud.options.get('split.maxChunks')
    )
  },
})

export {limitChunkCount as default}
