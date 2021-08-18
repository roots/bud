import type {Framework} from '@roots/bud-framework'

import {Bud} from '../Bud'
import {services} from '../Bud/services'
import {config} from '../config'

/**
 * Create a Bud instance in Node
 */
interface Factory {
  (overrides?: Factory.Options): Framework
}

namespace Factory {
  /**
   * Overrides for extensions, services and base configuration.
   */
  export interface Options {
    /**
     * Application name
     */
    name?: Framework['name']

    /**
     * Compilation mode
     */
    mode?: Framework['mode']

    /**
     * Framework base configuration
     */
    config?: config

    /**
     * Registered services
     */
    services?: Framework.Services
  }
}

const Factory = (overrides: Factory.Options): Framework => {
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

export {Factory}
