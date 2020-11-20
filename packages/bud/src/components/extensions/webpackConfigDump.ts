import {WebpackConfigDumpPlugin} from 'webpack-config-dump-plugin'
import type {Bud, Extension} from '@roots/bud-typings'

export const options: Options = ({fs}) => ({
  outputPath: fs.path.join(fs.getBase(), '.bud'),
  keepCircularReferences: true,
})

export const make: Extension.Make<
  WebpackConfigDumpPlugin,
  PluginOptions
> = opt => new WebpackConfigDumpPlugin(opt.getStore())

declare type Options = (bud: Bud.Bud) => PluginOptions

export type PluginOptions = {
  outputPath?: string
  name?: string
  depth?: number
  keepCircularReferences?: boolean
  showFunctionNames?: boolean
  includeFalseValues?: boolean
}
