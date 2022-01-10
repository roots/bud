import {Extension as BudExtension, Framework} from '@roots/bud-framework'
import TerserPlugin, {TerserOptions} from 'terser-webpack-plugin/types'

namespace Terser {
  export type Options = TerserOptions
  export type Plugin = TerserPlugin
}

export type Extension = BudExtension.CompilerPlugin<
  Terser.Plugin,
  Terser.Options
>

export type {Framework}

export type {Terser}
