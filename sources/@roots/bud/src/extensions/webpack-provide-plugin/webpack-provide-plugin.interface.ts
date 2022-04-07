import type {Extension} from '@roots/bud-framework'
import type {ProvidePlugin} from 'webpack'

export type Model = Extension.Plugin<
  ProvidePlugin,
  Record<string, Record<string, any>>
>
