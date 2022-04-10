import {Bud, Extension} from '@roots/bud-framework'
import AutoDllPlugin from 'autodll-webpack-plugin'

type BudDllPlugin = Extension.Plugin<AutoDllPlugin, AutoDllPlugin.Options>

interface BudDllPluginConstructor {
  (modules: string | string[]): BudDllPlugin
}

const BudDllPluginConstructor: BudDllPluginConstructor = modules => ({
  label: 'autodll-webpack-plugin',

  options: (app: Bud) => ({
    debug: false,
    inject: false,
    filename: app.store.is('features.hash', true)
      ? app.store.get('hashFormat')
      : app.store.get('fileFormat'),
    entry: {
      library: typeof modules == 'string' ? [modules] : modules,
    },
    path: 'dll',
    inherit: false,
    context: app.path(),
  }),

  make: options => new AutoDllPlugin(options.all()),
})

export {BudDllPlugin, BudDllPluginConstructor}
