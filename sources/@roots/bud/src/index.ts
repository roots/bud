// Copyright © Roots Software Foundation LLC
// Licensed under the MIT license.

/**
 * ⚡️ Frontend build tools combining the best parts of Symfony Encore and Laravel Mix
 *
 * @see https://bud.js.org
 * @see https://github.com/roots/bud
 *
 * @packageDocumentation
 */

import './types.js'

import Bud from './bud/index.js'
import * as cache from './factory/cache.js'
import {factory} from './factory/index.js'

const {get, set} = cache

export {Bud, Bud as default, cache, factory, get, set}
