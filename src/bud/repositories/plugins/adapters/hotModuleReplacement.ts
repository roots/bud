import {HotModuleReplacementPlugin} from 'webpack'
import type {WebpackAdapter} from './types'

const hotModuleReplacement = {
  setOptions: function () {
    return this.bud.options.get('hotModuleReplacement')
  },
  make: function () {
    return new HotModuleReplacementPlugin()
  },
  when: function () {
    return this.bud.features.enabled('hot')
  },
}

export {hotModuleReplacement}
