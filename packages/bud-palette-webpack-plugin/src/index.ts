import {plugin} from './adapter'
import {api} from './api'
import {Bud, Extension, ExtensionInterface} from '@roots/bud'

const paletteWebpackPlugin: Extension = (
  bud: Bud,
): ExtensionInterface => ({
  bud,
  name: 'palette-webpack-plugin',
  make: function (this: ExtensionInterface) {
    this.bud.apply('setPaletteBlacklist', api)
    this.bud.plugins.push(plugin)
  },
})

export {paletteWebpackPlugin}
