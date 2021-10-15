import {Options as FrameworkOptions} from '@roots/bud-framework'
import {SetOptional} from 'type-fest'

import {Bud} from './Bud'
import {config} from './config'
import {services} from './services'

/**
 * {@link Bud} constructor property overrides
 *
 * @core @public
 */
interface Options
  extends SetOptional<FrameworkOptions, 'name'> {}

/**
 * Create a {@link Bud} instance programatically
 *
 * @example
 * ```ts
 * const bud = factory()
 * ```
 *
 * @public @core @config
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

  return new Bud(options).bootstrap()
}
