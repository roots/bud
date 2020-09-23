import {WatchMissingNodeModulesPlugin} from '@roots/bud-support'
import {BudInterface, Plugin, PluginInterface} from '../'

const watchMissingNodeModules: Plugin = (
  bud: BudInterface,
): PluginInterface => ({
  bud,
  make: function (): typeof WatchMissingNodeModulesPlugin {
    return new WatchMissingNodeModulesPlugin(
      this.bud.fs.resolve('node_modules'),
    )
  },
})

export {watchMissingNodeModules as default}
