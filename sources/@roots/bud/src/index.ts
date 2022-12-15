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

import {Bud, Service, ServiceContainer} from '@roots/bud/bud'
import {factory} from '@roots/bud/factory'
import {get, has, instances, set} from '@roots/bud/instances'

export {Bud}
export {factory}
export {get, set, has, instances}

export {Service, ServiceContainer}

export type {
  Locations,
  Modules,
  Rules,
  Items,
  Loaders,
} from '@roots/bud-framework'

export default Bud
