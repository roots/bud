import {Extension} from '@roots/bud-framework/extension'
import AutoDllPlugin from 'autodll-webpack-plugin'

type Plugin = Partial<Extension<AutoDllPlugin.Options, AutoDllPlugin>>

interface factory {
  (modules: string | string[]): Plugin
}

const factory: factory = modules => ({
  label: 'autodll-webpack-plugin',

  options: {
    debug: false,
    inject: false,
    entry: {
      library: typeof modules == 'string' ? [modules] : modules,
    },
    path: 'dll',
    inherit: false,
  },

  plugin: AutoDllPlugin,
})

export {Plugin, factory}
