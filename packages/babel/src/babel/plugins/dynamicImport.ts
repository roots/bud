import {PluginItem} from '@babel/core'

export const dynamicImport: PluginItem = [
  require.resolve('@babel/plugin-syntax-dynamic-import'),
]
