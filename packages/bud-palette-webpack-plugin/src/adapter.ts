import PaletteWebpackPlugin from 'palette-webpack-plugin'
import type {Bud, Extension, ExtensionInterface} from '@roots/bud'

const plugin: Extension = (bud: Bud): ExtensionInterface => ({
  bud,
  name: 'palette-webpack-plugin',
  make: function () {
    return new PaletteWebpackPlugin(
      this.bud.options.get('webpack.plugins.palettePlugin'),
    )
  },
})

export {plugin}
