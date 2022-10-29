import type {Options} from '@roots/bud-framework'

import * as argv from '../context/argv.js'
import * as applicationContext from '../context/index.js'
import Bud from '../index.js'
import {mergeOptions} from './options.js'

/**
 * Cached instances
 *
 * @public
 */
let instances: Array<Bud> = []

const get = async (basedir?: string) => {
  basedir = basedir ?? argv.basedir

  const cached = instances.find(
    instance => instance.context.basedir === basedir,
  )

  if (!cached) return await factory()
  return cached
}

/**
 * Create a {@link Bud} instance programatically
 *
 * @example
 * ```ts
 * const bud = await factory()
 * ```
 *
 * @example
 * Running in a particular mode
 *
 * ```ts
 * const bud = await factory({mode: 'development'})
 * ```
 *
 * @returns Bud instance
 *
 * @public
 */
export async function factory(
  config?: Options.Overrides,
  skipCache = false,
): Promise<Bud> {
  const basedir = config?.basedir ?? argv.basedir

  if (skipCache !== true) {
    const cached = instances.find(
      instance => instance.context.basedir === basedir,
    )

    if (cached) {
      cached.log(`using cached instance`)
      return cached
    }
  }

  const context = await applicationContext.get(basedir)

  Array.isArray(config?.services) &&
    config.services
      .filter(service => !context?.services.includes(service))
      .map(service => context.services.push(service))

  Array.isArray(config?.extensions?.builtIn) &&
    config.extensions.builtIn
      .filter(extension => !context.extensions.builtIn.includes(extension))
      .map(extension => context.extensions.builtIn.push(extension))

  Array.isArray(config?.extensions?.discovered) &&
    config.extensions.discovered
      .filter(
        extension => !context.extensions.discovered.includes(extension),
      )
      .map(extension => context.extensions.discovered.push(extension))

  const options = mergeOptions(context, config)
  const instance = await new Bud().lifecycle(options)

  instances.push(instance)

  return instance
}

export {get, instances}
