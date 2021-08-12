import type {Framework} from '@roots/bud-framework'

import {Bud} from '../Bud'
import services from '../Bud/services'
import type {Configuration} from '../config'
import {config} from '../config'

/**
 * Create a Bud instance programmatically.
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
    config?: Configuration

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

export default Factory
