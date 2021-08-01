/**
 * @module @roots/bud-imagemin
 */

import './interface'

import {Config} from './Config'
import {extension} from './imagemin'
import {WebpackPlugin} from './WebpackPlugin'

/**
 * @exports extension
 * @exports default
 */
export {extension, extension as default}

/**
 * @exports name
 * @exports api
 * @exports register
 * @exports boot
 */
export const {name, api, register, boot} = extension

/**
 * @exports Config
 */
export {Config}

/**
 * @exports WebpackPlugin
 */
export {WebpackPlugin}
