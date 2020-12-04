import {Configuration} from 'webpack'
import {Bud} from '.'

export interface Contract {
  ci: boolean

  get(): Configuration['mode']

  set(mode: Configuration['mode']): Bud.Bud

  is(check: Configuration['mode']): boolean
}
