import {Compression} from './externals'
import type {Plugin} from '@roots/bud-typings'

/**
 * Gzip
 */
const gzip: Plugin = bud => ({
  bud,

  options: bud.options.get('webpack.plugins.compression.gzip'),

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
const brotli: Plugin = bud => ({
  bud,

  options: bud.options.get('webpack.plugins.compression.brotli'),

  make: function (): Compression {
    return new Compression(this.options)
  },

  when: function () {
    return this.bud.features.enabled('brotli')
  },
})

export {brotli, gzip}
