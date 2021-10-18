import {Extension} from '@roots/bud-framework'
import {WebpackConfigDumpPlugin} from 'webpack-config-dump-plugin'

export interface Options {
  name?: string
  depth?: number
  keepCircularReferences?: boolean
  showFunctionNames?: boolean
  includeFalseValues?: boolean
}

export interface Plugin
  extends Extension.CompilerPlugin<
    WebpackConfigDumpPlugin,
    Options
  > {}
