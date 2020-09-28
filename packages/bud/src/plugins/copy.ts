import Bud from '@roots/bud-types'
import {CopyWebpackPlugin} from './externals'

const copy: Bud.Plugin.Factory = bud => ({
  bud,

  make: function () {
    return new CopyWebpackPlugin(
      this.bud.options.get('plugins.copy'),
    )
  },
  when: function () {
    return (
      this.bud.options.get('plugins.copy')?.patterns?.length > 0
    )
  },
})

export {copy as default}
