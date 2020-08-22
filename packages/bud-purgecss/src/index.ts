import {Bud, Extension, ExtensionInterface} from '@roots/bud'
import {config} from './api'
import {wordpress} from './presets'

/**
 * Bud extension: purgecss
 *
 * Adds purgecss support to the Bud framework.
 *
 * @type {Extension}
 */
const purgecss: Extension = (bud: Bud): ExtensionInterface => ({
  bud,

  name: 'purgecss',

  make: function (this: ExtensionInterface): void {
    this.bud.apply('purgecss', config)
  },
})

const presets = {wordpress}

export {purgecss, presets}
