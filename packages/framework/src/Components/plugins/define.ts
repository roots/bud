import * as Extension from '../../Extend/Extension'
import {DefinePlugin} from 'webpack'

const define: Extension.Factory = bud => ({
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
