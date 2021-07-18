import {Bud} from './Bud'
import {config} from './config'
import {services} from './services'

import type {Framework, Configuration} from './'

export type Factory = (overrides?: Factory.Options) => Framework

export namespace Factory {
  export interface Options {
    name: string
    mode?: 'production' | 'development'
    config?: Configuration
    services?: Framework.Services
    parent?: Framework
  }
}

export const factory: Factory = overrides => {
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
