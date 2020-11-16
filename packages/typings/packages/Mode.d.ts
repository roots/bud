import {Configuration} from 'webpack'
import {Bud} from '.'

export interface Contract {
  get(): Configuration['mode']

  set(mode: Configuration['mode']): Bud.Contract

  is(check: Configuration['mode']): boolean
}
