import {WebpackConfigDumpPlugin} from 'webpack-config-dump-plugin'
import type {Extension} from '@roots/bud-extensions'

export const options: Extension.RawOptions<Options> = ({
  project,
}) => ({
  outputPath: project(),
  keepCircularReferences: true,
})

export const make: Extension.Make<
  WebpackConfigDumpPlugin,
  Options
> = options => new WebpackConfigDumpPlugin(options.all())

declare interface Options {
  outputPath?: string
  name?: string
  depth?: number
  keepCircularReferences?: boolean
  showFunctionNames?: boolean
  includeFalseValues?: boolean
}
