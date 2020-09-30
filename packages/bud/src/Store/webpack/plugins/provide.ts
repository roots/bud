import Bud from '@roots/bud-types'
import {ProvidePlugin} from './externals'

const provide: Bud.Plugin.Factory = bud => ({
  bud,

  options: {},

  make: function () {
    return new ProvidePlugin(this.options)
  },
})

export {provide as default}
