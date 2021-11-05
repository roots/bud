import type {Extension} from '@roots/bud-framework'
import type {ProvidePlugin} from '@roots/bud-support'

export type Model = Extension.CompilerPlugin<
  ProvidePlugin,
  Record<string, Record<string, any>>
>
