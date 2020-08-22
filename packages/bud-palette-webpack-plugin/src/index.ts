import {adapter} from './adapter'
import {api} from './api'

import {Bud, Extension, ExtensionInterface} from '@roots/bud'

/**
 * ## bud.paletteWebpackPlugin
 */
const paletteWebpackPlugin: Extension = (
  bud: Bud,
): ExtensionInterface => ({
  bud,

  name: 'palette-webpack-plugin',

  make: function (this: ExtensionInterface) {
    this.bud.apply('setPaletteBlacklist', api)
    this.bud.adapters.add(adapter)
  },
})

export {paletteWebpackPlugin}
