import {WebpackConfigDumpPlugin} from 'webpack-config-dump-plugin'
import type {Extension} from '@roots/bud-typings'

export const options: Options = ({fs}) => ({
  outputPath: fs.path.join(fs.getBase(), '.bud'),
  keepCircularReferences: true,
})

export const make: Extension.Make = opt =>
  new WebpackConfigDumpPlugin(opt.all())

declare type Options = Extension.Options<{
  outputPath?: string
  name?: string
  depth?: number
  keepCircularReferences?: boolean
  showFunctionNames?: boolean
  includeFalseValues?: boolean
}>
