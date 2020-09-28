import Bud from '@roots/bud-types'
import {ProvidePlugin} from './externals'

const provide: Bud.Plugin.Factory = bud => ({
  bud,

  make: function () {
    return new ProvidePlugin(
      this.bud.options.get('plugins.provide'),
    )
  },
})

export {provide as default}
