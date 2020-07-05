import {mode, inProduction} from './mode'
import {configs} from './configs'
import {features, options, paths} from './base'

/**
 * Initial props.
 *
 * @typedef  {object.<initialProps>}
 * @property {object.<configs>}      configs
 * @property {object.<features>}     features
 * @property {boolean}               inProduction
 * @property {string}                mode
 * @property {object.<options>}      options
 * @property {object.<paths>}        paths
 */
const initialProps = {
  configs,
  features,
  inProduction,
  mode,
  options,
  paths,
}

export {initialProps}
