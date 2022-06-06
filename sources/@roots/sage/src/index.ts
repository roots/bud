// Copyright © Roots Software Foundation LLC
// Licensed under the MIT license.

/**
 * This preset configures Bud for use with the Sage starter theme
 *
 * @see https://github.com/roots/bud
 * @see https://github.com/roots/sage
 *
 * @packageDocumentation
 */

import './env.js'

import Sage from './extension.js'
export default Sage

import * as client from './client/index.js'
export {client}
