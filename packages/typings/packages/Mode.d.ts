import {Configuration} from 'webpack'
import {Bud} from '.'

/**
 * Mode
 *
 * Helper utility for determining current compilation mode.
 *
 * @see {Webpack.Mode}
 */

export interface Contract {
  get(): Configuration['mode']

  set(mode: Configuration['mode']): Bud.Contract

  is(check: Configuration['mode']): boolean
}
