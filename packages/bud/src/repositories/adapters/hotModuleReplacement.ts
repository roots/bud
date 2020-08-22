import {HotModuleReplacementPlugin} from 'webpack'

import type {Extension} from './index'

const hotModuleReplacement: Extension = bud => ({
  bud,

  name: 'hot-module-replacement-plugin',

  options: bud.options.get('adapters.hotModuleReplacement'),

  make: function () {
    return new HotModuleReplacementPlugin(this.options)
  },

  when: function () {
    return this.bud.features.enabled('hot')
  },
})

export {hotModuleReplacement}
