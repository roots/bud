import Bud from '@roots/bud-types'
import {HotModuleReplacementPlugin} from 'webpack'

const hotModuleReplacement: Bud.Plugin.Factory = bud => ({
  bud,

  make: function () {
    return new HotModuleReplacementPlugin()
  },

  when: function () {
    return this.bud.features.enabled('hot')
  },
})

export {hotModuleReplacement as default}
