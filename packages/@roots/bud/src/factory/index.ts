import {Bud} from '../Bud'
import {config} from '../config'
import {services} from '../services'
import type {Framework, Options} from './factory.interface'

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
export async function factory(
  overrides?: Options,
): Promise<Bud> {
  const options: Framework.Options = {
    ...(overrides ?? {}),
    services: {
      ...services,
      ...(overrides?.services ?? {}),
    },
    config: {
      ...config,
      ...(overrides?.config ?? {}),
      features: {
        ...config.features,
        ...(overrides?.config?.features ?? {}),
      },
      location: {
        ...config.location,
        ...(overrides?.config?.location ?? {}),
      },
    },
  }

  process.env.BABEL_ENV = options.config.mode
  process.env.NODE_ENV = options.config.mode

  const bud = new Bud(options)

  bud.time('bud')
  bud.dump(options)
  bud.dump(process.env, {prefix: 'process.env'})

  await bud.lifecycle()

  return bud
}
