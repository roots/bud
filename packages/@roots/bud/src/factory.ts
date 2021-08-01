/**
 * @module @roots/bud
 */

import type {Configuration, Framework} from './'
import {Bud} from './Bud'
import {config} from './config'
import {services} from './services'

/**
 * @interface Factory
 */
interface Factory {
  (overrides?: Factory.Options): Framework
}

namespace Factory {
  export interface Options {
    name: string
    mode?: 'production' | 'development'
    config?: Configuration
    services?: Framework.Services
    parent?: Framework
  }
}

/**
 * @function factory
 *
 * Create a Bud instance programmatically.
 *
 * Extensions, services and base configuration can all be overridden using props. {@link Factory.Options}
 */
const factory: Factory = overrides => {
  return new Bud({
    name: 'bud',
    mode: 'production',
    ...overrides,
    services: {
      ...services,
      ...(overrides?.services ?? {}),
    },
    config: {
      ...config,
      ...(overrides?.config ?? {}),
    },
  }).bootstrap()
}

/**
 * @exports factory
 */
export {factory}

/**
 * @exports Factory
 */
export {Factory}
