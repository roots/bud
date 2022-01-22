import type {Configuration} from 'webpack'
import type {Framework} from '@roots/bud-framework'

export interface method {
  (options?: Configuration['optimization']['splitChunks']): Framework
}

export interface facade {
  (options?: Configuration['optimization']['splitChunks']): Framework
}
