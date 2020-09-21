import {TerserPlugin} from './externals'
import {BudInterface, Plugin} from '../'

const terser: Plugin = (bud: BudInterface) => ({
  bud,

  options: bud.options.get('plugins.terser'),

  make: function () {
    return new TerserPlugin(this.options)
  },

  when: function () {
    if (this.bud) {
      return this.bud.features.enabled('minify')
    }

    return false
  },
})

export {terser as default}
