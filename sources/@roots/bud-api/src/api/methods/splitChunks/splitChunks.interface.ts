import type {Framework} from '@roots/bud-framework'
import type {Configuration} from 'webpack'

export interface method {
  (options?: Configuration['optimization']['splitChunks']): Framework
}

export interface facade {
  (options?: Configuration['optimization']['splitChunks']): Framework
}
