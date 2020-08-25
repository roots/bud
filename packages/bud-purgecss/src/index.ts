import {Extension} from '@roots/bud'
import {config} from './api'
import wordpress from 'purgecss-with-wordpress'

/**
 * Bud extension: purgecss
 *
 * Adds purgecss support to the Bud framework.
 */
const purgecss: Extension = bud => ({
  bud,
  name: 'purgecss',
  make: function () {
    this.bud.apply('purgecss', config)
  },
})

const presets = {wordpress}
export {purgecss, presets}
