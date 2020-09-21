import {DefinePlugin} from './externals'
import {BudInterface, Plugin} from '../'

const define: Plugin = (bud: BudInterface) => ({
  options: bud.env.repository,

  make: function () {
    return new DefinePlugin(this.options)
  },

  when: function () {
    return this.options ? true : false
  },
})

export {define as default}
