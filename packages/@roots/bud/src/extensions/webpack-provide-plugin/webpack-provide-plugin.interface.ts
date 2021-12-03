import type {Extension} from '@roots/bud-framework'
import type {ProvidePlugin} from 'webpack'

export type Model = Extension.CompilerPlugin<
  ProvidePlugin,
  Record<string, Record<string, any>>
>
