import {HotModuleReplacementPlugin} from 'webpack'

const hotModuleReplacement: WebpackAdapter = () => ({
  setOptions: function () {
    return this.bud.options.hotModuleReplacement
  },
  make: function () {
    return new HotModuleReplacementPlugin()
  },
  when: function () {
    return this.bud.features.hot
  },
})

export {hotModuleReplacement}
import type {WebpackAdapter} from '../..'
