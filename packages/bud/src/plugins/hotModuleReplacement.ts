import {HotModuleReplacementPlugin} from 'webpack'
import {BudInterface, Plugin} from '../'

const hotModuleReplacement: Plugin = (bud: BudInterface) => ({
  bud,

  make: function () {
    return new HotModuleReplacementPlugin()
  },

  when: function () {
    return this.bud.features.enabled('hot')
  },
})

export {hotModuleReplacement as default}
