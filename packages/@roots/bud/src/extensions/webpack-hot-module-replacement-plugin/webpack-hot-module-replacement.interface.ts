import {Extension} from '@roots/bud-framework'
import {HotModuleReplacementPlugin} from 'webpack'

export type Plugin = Extension.CompilerPlugin<
  HotModuleReplacementPlugin,
  any
>
