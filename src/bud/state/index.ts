import {configs} from './configs'
import {features} from './features'
import {options} from './options'
import {paths} from './paths'
import {plugins} from './plugins'
import type {State} from './types'

/**
 * bud.state
 */
export const state: State = {
  configs,
  features,
  options,
  paths,
  plugins,
}
