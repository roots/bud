import * as Extension from '../../Extend/Extension'
import {ProvidePlugin} from 'webpack'

const provide: Extension.Factory = bud => ({
  bud,

  options: {},

  make: function () {
    return new ProvidePlugin(this.options)
  },
})

export {provide as default}
