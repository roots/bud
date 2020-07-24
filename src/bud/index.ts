import {api} from './api'
import {hooks} from './hooks'
import {util} from './util'
import {plugin} from './plugin'
import {state} from './state'
import {inProduction, mode} from './mode'

import type {Bud} from './types'

/**
 * Bud - asset management framework.
 *
 * @see {@link https://roots.io/bud}
 * @copyright Roots {@link https://roots.io}
 */
const bud: Bud = {
  ...api,
  hooks,
  util,
  plugin,
  state,
  mode,
  inProduction,
}

export {bud}
