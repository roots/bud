import {WebpackConfigDumpPlugin} from 'webpack-config-dump-plugin'
import type {Module} from '@roots/bud-typings'

export const name = `webpack-config-dump-plugin`

export const make: Module.Make<
  WebpackConfigDumpPlugin,
  PluginOptions
> = options => new WebpackConfigDumpPlugin(options.all())

export const when: Module.When = ({store}) =>
  store.isTrue('options.debug')

export const options: Module.Options<PluginOptions> = app => ({
  name: 'webpack.debug.js',
  outputPath: app.project(app.subscribe('location/storage')),
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
