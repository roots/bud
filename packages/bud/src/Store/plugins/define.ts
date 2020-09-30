import {DefinePlugin} from './externals'
import Bud from '@roots/bud-types'

const define: Bud.Plugin.Factory = bud => ({
  bud,

  options: bud.store['env'].repository,

  make: function () {
    return new DefinePlugin(this.options)
  },

  when: function () {
    return this.options ? true : false
  },
})

export {define as default}
