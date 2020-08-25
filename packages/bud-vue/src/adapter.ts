import {VueLoaderPlugin} from 'vue-loader'
import type {Extension} from '@roots/bud'

const vuePlugin: Extension = bud => ({
  bud,
  name: 'vue',
  make: function () {
    return new VueLoaderPlugin()
  },
})

export default vuePlugin
