import {Bud, Extension, ExtensionInterface} from '@roots/bud'
import config from './api'
import presets from './presets'

/**
 * Bud extension: purgecss
 *
 * Adds purgecss support to the Bud framework.
 *
 * @type {Extension}
 */
const purgecss: Extension = (bud: Bud): ExtensionInterface => ({
  bud,
  make: function (this: ExtensionInterface): void {
    this.bud.purgecss = config
  },
})

export = {
  purgecss,
  presets,
}
