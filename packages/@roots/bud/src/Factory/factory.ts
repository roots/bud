import {Bud} from '../Bud'
import {config} from '../config'
import {services} from '../services'
import type {Factory} from './'

/**
 * Instantiate a new Bud instance
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

export {factory}
