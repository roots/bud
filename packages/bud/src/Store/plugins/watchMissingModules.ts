import Bud from '@roots/bud-types'
import {WatchMissingNodeModulesPlugin} from '@roots/bud-support'

const watchMissingNodeModules: Bud.Plugin.Factory = (
  bud: Bud,
) => ({
  bud,

  make: function (): typeof WatchMissingNodeModulesPlugin {
    return new WatchMissingNodeModulesPlugin(
      this.bud.fs.get('node_modules'),
    )
  },
})

export {watchMissingNodeModules as default}
