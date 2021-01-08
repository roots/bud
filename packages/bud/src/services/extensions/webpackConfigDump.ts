import {WebpackConfigDumpPlugin} from 'webpack-config-dump-plugin'
import type {Module} from '@roots/bud-typings'

export const options: Module.Options<{
  outputPath?: string
  name?: string
  depth?: number
  keepCircularReferences?: boolean
  showFunctionNames?: boolean
  includeFalseValues?: boolean
}> = ({store}) => ({
  name: 'webpack.debug.js',
  outputPath: store
    .get('webpack.recordsPath')
    .split('/')
    .splice(
      0,
      store.get('webpack.recordsPath').split('/').length - 1,
    )
    .join('/'),
  keepCircularReferences: true,
})

export const make: Module.Make<
  WebpackConfigDumpPlugin,
  PluginOptions
> = options => new WebpackConfigDumpPlugin(options.getStore())

export const when: Module.When = ({store}) =>
  store.enabled('features.debug')

export type PluginOptions = {
  outputPath?: string
  name?: string
  depth?: number
  keepCircularReferences?: boolean
  showFunctionNames?: boolean
  includeFalseValues?: boolean
}
