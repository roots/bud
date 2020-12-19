import {WebpackConfigDumpPlugin} from 'webpack-config-dump-plugin'
import type {Bud, Extension} from '@roots/bud-typings'

export const options: Options = ({config}) => ({
  name: 'webpack.debug.js',
  outputPath: config
    .get('recordsPath')
    .split('/')
    .splice(0, config.get('recordsPath').split('/').length - 1)
    .join('/'),
  keepCircularReferences: true,
})

export const make: Extension.Module.Make<
  WebpackConfigDumpPlugin,
  PluginOptions
> = opt => new WebpackConfigDumpPlugin(opt.getStore())

export const when: Extension.Module.When = ({features}) =>
  features.enabled('debug')

declare type Options = (bud: Bud) => PluginOptions

export type PluginOptions = {
  outputPath?: string
  name?: string
  depth?: number
  keepCircularReferences?: boolean
  showFunctionNames?: boolean
  includeFalseValues?: boolean
}
