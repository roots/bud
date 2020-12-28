import {WebpackConfigDumpPlugin} from 'webpack-config-dump-plugin'
import type {Framework, Module} from '@roots/bud-typings'

export const options: Options = ({config}) => ({
  name: 'webpack.debug.js',
  outputPath: config
    .get('recordsPath')
    .split('/')
    .splice(0, config.get('recordsPath').split('/').length - 1)
    .join('/'),
  keepCircularReferences: true,
})

export const make: Module.Make<
  WebpackConfigDumpPlugin,
  PluginOptions
> = opt => new WebpackConfigDumpPlugin(opt.getStore())

export const when: Module.When = ({features}) =>
  features.enabled('debug')

declare type Options = (bud: Framework) => PluginOptions

export type PluginOptions = {
  outputPath?: string
  name?: string
  depth?: number
  keepCircularReferences?: boolean
  showFunctionNames?: boolean
  includeFalseValues?: boolean
}
