import type {Options} from '@roots/bud-framework'

import Bud from '../bud.js'
import * as argv from '../context/argv.js'
import * as applicationContext from '../context/index.js'
import {config} from './config.js'
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
  overrides?: Options.Overrides,
  skipCache = false,
  skipConfig = false,
): Promise<Bud> {
  const basedir = overrides?.basedir ?? argv.basedir

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

  Array.isArray(overrides?.extensions) &&
    overrides.extensions
      .filter(extension => !context?.extensions.includes(extension))
      .map(extension => context.extensions.push(extension))

  Array.isArray(overrides?.services) &&
    overrides.services
      .filter(service => !context?.services.includes(service))
      .map(service => context.services.push(service))

  const options = mergeOptions(context, overrides)
  const instance = await new Bud().lifecycle(options)

  instances.push(instance)

  if (skipConfig !== true) {
    try {
      await config(instance)
    } catch (error) {
      throw error
    }
  }

  return instance
}

export {get, instances}
