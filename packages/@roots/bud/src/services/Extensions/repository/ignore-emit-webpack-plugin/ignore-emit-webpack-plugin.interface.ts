import type {Extension} from '@roots/bud-framework'
import type {IgnoreEmitWebpackPlugin} from '@roots/bud-support'

export interface Options {
  ignore: RegExp[]
}

export type Model = Extension.CompilerPlugin<
  IgnoreEmitWebpackPlugin,
  Options
>
