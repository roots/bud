import {PluginItem, PluginTarget} from '@babel/core'

const dynamicImportTarget: PluginTarget = require.resolve(
  '@babel/plugin-syntax-dynamic-import',
)

export const dynamicImport: PluginItem = [dynamicImportTarget]
