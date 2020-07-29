import {configs} from './configs'
import {features} from './features'
import {options} from './options'
import {paths} from './paths'
import {plugins} from './plugins'
import {flags} from './flags'
import type {State} from './types'

/**
 * bud.state
 */
export const state: State = {
  configs,
  flags,
  features,
  options,
  paths,
  plugins,
}
