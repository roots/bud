import {Framework, WebpackPlugin} from '@roots/bud-framework'
import {Container} from '@roots/container'
import AutoDllPlugin from 'autodll-webpack-plugin'

interface BudDllPlugin
  extends WebpackPlugin<AutoDllPlugin, AutoDllPlugin.Options> {
  name: WebpackPlugin['name'] & 'autodll-webpack-plugin'
  options: (app: Framework) => AutoDllPlugin.Options
  make(options: Container<AutoDllPlugin.Options>): AutoDllPlugin
}
interface BudDllPluginConstructor {
  (modules: string | string[]): BudDllPlugin
}

const BudDllPluginConstructor: BudDllPluginConstructor =
  modules => ({
    name: 'autodll-webpack-plugin',

    options: (app: Framework) => ({
      debug: false,
      inject: false,
      filename: app.store.isTrue('hash')
        ? app.store.get('hashFormat')
        : app.store.get('fileFormat'),
      entry: {
        library:
          typeof modules == 'string' ? [modules] : modules,
      },
      path: 'dll',
      inherit: false,
      context: app.path('project'),
    }),

    make: options => new AutoDllPlugin(options.all()),
  })

export {BudDllPlugin, BudDllPluginConstructor}
