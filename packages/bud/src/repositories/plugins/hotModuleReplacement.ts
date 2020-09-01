import {HotModuleReplacementPlugin} from 'webpack'
import type {Plugin} from '@roots/bud-typings'

const hotModuleReplacement: Plugin = bud => ({
  bud,

  make: function () {
    return new HotModuleReplacementPlugin()
  },

  when: function () {
    return this.bud.features.enabled('dev')
  },
})

export {hotModuleReplacement}
