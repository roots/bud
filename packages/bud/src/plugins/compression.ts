import Bud from '@roots/bud-types'
import Compression from 'compression-webpack-plugin'

/**
 * Gzip
 */
const gzip: Bud.Plugin.Factory = bud => ({
  bud,

  options: bud.options.get('plugins.compression.gzip'),

  make: function (): Compression {
    return new Compression(this.options)
  },

  when: function () {
    return this.bud.features.enabled('gzip')
  },
})

/**
 * Brotli
 */
const brotli: Bud.Plugin.Factory = bud => ({
  bud,

  options: bud.options.get('plugins.compression.brotli'),

  make: function (): Compression {
    return new Compression(this.options)
  },

  when: function () {
    return this.bud.features.enabled('brotli')
  },
})

export {brotli, gzip}
