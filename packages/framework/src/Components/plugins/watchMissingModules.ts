import * as Extension from './../../Extend/Extension'
import {WatchMissingNodeModulesPlugin} from '@roots/bud-support'

const watchMissingNodeModules: Extension.Factory = bud => ({
  bud,

  make: function (): typeof WatchMissingNodeModulesPlugin {
    return new WatchMissingNodeModulesPlugin(
      this.bud.fs.get('node_modules'),
    )
  },
})

export {watchMissingNodeModules as default}
