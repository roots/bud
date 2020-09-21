import {Compression} from './externals'
import {BudInterface, Plugin} from '../'

/**
 * Gzip
 */
const gzip: Plugin = (bud: BudInterface) => ({
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
const brotli: Plugin = (bud: BudInterface) => ({
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
