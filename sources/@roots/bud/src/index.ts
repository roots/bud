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

import Bud, {Service, ServiceContainer} from './bud/bud.js'
import makeContext from './context/index.js'
import {factory} from './factory/index.js'
import {get, has, instances, set} from './instances.js'

export {factory, makeContext}
export {get, set, has, instances}

export {Bud}
export {Service, ServiceContainer}
