import {WebpackConfigDumpPlugin} from 'webpack-config-dump-plugin'
import type {Extension} from '@roots/bud-extensions'

export const options: RawOptions = ({project}) => ({
  outputPath: project(),
  keepCircularReferences: true,
})

export const make: Make = opt =>
  new WebpackConfigDumpPlugin(opt.all())

declare type Make = Extension.Make<
  WebpackConfigDumpPlugin,
  Options
>
declare type Options = Extension.Options<RawOptions>
declare type RawOptions = Extension.RawOptions<{
  outputPath?: string
  name?: string
  depth?: number
  keepCircularReferences?: boolean
  showFunctionNames?: boolean
  includeFalseValues?: boolean
}>
