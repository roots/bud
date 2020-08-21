import {Bud, Extension, ExtensionInterface} from '@roots/bud'

import adapter from './adapter'
import api from './api'

const jsonPalette: Extension = (bud: Bud): ExtensionInterface => ({
  bud,

  make: function (this: ExtensionInterface) {
    this.bud.setPaletteBlacklist = api
    this.bud.adapters.add(adapter)
  },
})

exports = {palettePlugin}
