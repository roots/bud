import type {Framework} from '@roots/bud-framework'
import type {Configuration} from 'webpack'

export type Alias = Configuration['resolve']['alias'] & {
  [index: string]: string | false | string[]
}

export interface facade {
  (alias: Configuration['resolve']['alias']): Framework
}

export interface method {
  (alias: Alias): Framework
}

export type {Framework, Configuration}
