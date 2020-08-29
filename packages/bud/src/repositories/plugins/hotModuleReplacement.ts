import {HotModuleReplacementPlugin} from 'webpack'
import type {Plugin} from '@roots/bud-framework'

const hotModuleReplacement: Plugin = bud => ({
  bud,

  make: function () {
    return new HotModuleReplacementPlugin()
  },
})

export {hotModuleReplacement}
