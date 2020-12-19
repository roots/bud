/**
 * Service abstract base class.
 */
export {Service} from './Bud/Service'

/**
 * Data handling.
 */
export {
  isArray,
  isArrayLike,
  isObject,
  isObjectLike,
  isString,
  isFunction,
  isEqual,
  get,
  set,
} from 'lodash'

/**
 * Grab bag
 */
export {eslintFormatter} from './util'
export {launchEditor} from './util'
export {launchEditorEndpoint} from './util'
export {notify} from './util'
export {formatWebpackMessages} from './util'
export {WatchMissingNodeModulesPlugin} from './util'
export {InterpolateHtmlPlugin} from './util'
export {checkRequiredFiles, dump} from './util'
export {processHandler} from './util'
