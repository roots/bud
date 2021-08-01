/**
 * @module @roots/bud-postcss
 */

import './interface'

import * as extension from './extension'

/**
 * @exports extension
 * @exports default
 */
export {extension, extension as default}

/**
 * @exports name
 * @exports api
 * @exports boot
 */
export const {name, api, boot} = extension

/**
 * @exports Config
 */
export {Config} from './Config'
