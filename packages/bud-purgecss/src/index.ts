import {Bud, Extension, ExtensionInterface} from '@roots/bud'
import config from './api'
import presets from './presets'

declare const bud: Bud

/**
 * Bud extension: purgecss
 *
 * Adds purgecss support to the Bud framework.
 *
 * @type {Extension}
 */
const purgecss: Extension = () => ({
  make: function (this: ExtensionInterface) {
    if (this.bud) {
      this.bud.purgecss = config
    }
  },
})

export = {
  purgecss,
  presets,
}
