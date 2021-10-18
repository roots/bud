import {Bud} from '../Bud'
import {config} from '../config'
import {services} from '../services'
import type {
  FrameworkOptions,
  Options,
} from './factory.interface'

/**
 * Create a {@link Bud} instance programatically
 *
 * @example
 * ```ts
 * const bud = factory()
 * ```
 *
 * @public
 */
export function factory(overrides?: Options): Bud {
  const options: FrameworkOptions = {
    name: overrides?.name ?? 'bud',
    mode: overrides?.mode ?? 'production',
    config,
    services,
  }

  overrides?.services &&
    Object.assign(options.services, overrides.services)

  overrides?.config &&
    Object.assign(options.config, overrides.config)

  process.env.BABEL_ENV = options.mode
  process.env.NODE_ENV = options.mode

  const bud = new Bud(options)
  return bud.bootstrap()
}
