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
export async function factory(
  overrides?: Options,
): Promise<Bud> {
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

  await bud.bootstrap()

  if (!bud.cache.valid) return bud

  await bud.project
    .getEntries('extensions')
    .reduce(async (promised, [name, extension]) => {
      await promised
      bud.log('Using cached extension', extension.name)
      const resolvedExtension = await import(extension.name)

      bud.extensions.add(resolvedExtension)

      if (!bud.extensions.has(extension.name)) {
        bud.error('Cached extension not found', extension.name)
      }

      return Promise.resolve()
    }, Promise.resolve())

  return bud
}
