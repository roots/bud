import {VueLoaderPlugin} from 'vue-loader'
import type {Bud, Extension, ExtensionInterface} from '@roots/bud'

const adapter: Extension = (bud: Bud): ExtensionInterface => ({
  bud,

  name: 'vue',

  make: function () {
    return new VueLoaderPlugin()
  },
})

export default adapter
