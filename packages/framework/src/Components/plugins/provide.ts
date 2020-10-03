import * as Extension from './../../Extend/Extension'
import {ProvidePlugin} from './externals'

const provide: Extension.Factory = bud => ({
  bud,

  options: {},

  make: function () {
    return new ProvidePlugin(this.options)
  },
})

export {provide as default}
