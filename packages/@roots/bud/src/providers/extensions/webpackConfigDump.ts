import {WebpackConfigDumpPlugin} from 'webpack-config-dump-plugin'
import type {Module} from '@roots/bud-typings'

export const make: Module.Make<
  WebpackConfigDumpPlugin,
  PluginOptions
> = options => new WebpackConfigDumpPlugin(options.all())

export const when: Module.When = ({options}) =>
  options.enabled('debug')

export const options: Module.Options<PluginOptions> = ({
  store,
}) => ({
  name: 'webpack.debug.js',
  outputPath: store
    .access('webpack.recordsPath')
    .split('/')
    .splice(
      0,
      store.access('webpack.recordsPath').split('/').length - 1,
    )
    .join('/'),
  keepCircularReferences: true,
})

export type PluginOptions = {
  outputPath?: string
  name?: string
  depth?: number
  keepCircularReferences?: boolean
  showFunctionNames?: boolean
  includeFalseValues?: boolean
}
