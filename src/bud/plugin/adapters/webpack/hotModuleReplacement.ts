import {HotModuleReplacementPlugin} from 'webpack'
import type {WebpackAdapter} from './types'

const hotModuleReplacement: WebpackAdapter = () => ({
  setOptions: function () {
    return this.bud.state.options.hotModuleReplacement
  },
  make: function () {
    return new HotModuleReplacementPlugin()
  },
  when: function () {
    return this.bud.state.features.hot
  },
})

export {hotModuleReplacement}
