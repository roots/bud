import type {Bud} from '@roots/bud-framework'
import type {Configuration} from 'webpack'

export interface method {
  (options?: Configuration['optimization']['splitChunks']): Bud
}

export interface facade {
  (options?: Configuration['optimization']['splitChunks']): Bud
}
