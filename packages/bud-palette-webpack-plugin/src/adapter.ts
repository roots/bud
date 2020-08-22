import paletteWebpackPlugin from 'palette-webpack-plugin'
import type {Bud, Extension, ExtensionInterface} from '@roots/bud'

const adapter: Extension = (bud: Bud): ExtensionInterface => ({
  bud,

  name: 'palette-webpack-plugin',

  make: function () {
    return new paletteWebpackPlugin({
      blacklist: this.bud.options.get('palette-blacklist'),
    })
  },
})

export {adapter}
