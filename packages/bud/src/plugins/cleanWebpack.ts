import {CleanWebpackPlugin} from './externals'
import {BudInterface, Plugin} from '../'

const cleanWebpack: Plugin = (bud: BudInterface) => ({
  bud,

  options: bud.options.get('plugins.clean'),

  make: function (): CleanWebpackPlugin {
    return new CleanWebpackPlugin(this.options)
  },

  when: function () {
    return this.bud.features.enabled('clean')
  },
})

export {cleanWebpack as default}
