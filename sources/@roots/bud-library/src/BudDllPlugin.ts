import {Extension, Framework} from '@roots/bud-framework'
import AutoDllPlugin from 'autodll-webpack-plugin'

type BudDllPlugin = Extension.CompilerPlugin<
  AutoDllPlugin,
  AutoDllPlugin.Options
>

interface BudDllPluginConstructor {
  (modules: string | string[]): BudDllPlugin
}

const BudDllPluginConstructor: BudDllPluginConstructor = modules => ({
  name: 'autodll-webpack-plugin',

  options: (app: Framework) => ({
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
