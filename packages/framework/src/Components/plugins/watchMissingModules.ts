import {WatchMissingNodeModulesPlugin} from '@roots/bud-support'

const watchMissingNodeModules: Framework.Extension.Factory = bud => ({
  bud,

  make: function (): WatchMissingNodeModulesPlugin {
    return new WatchMissingNodeModulesPlugin(
      this.bud.project('node_modules'),
    )
  },
})

export {watchMissingNodeModules as default}
