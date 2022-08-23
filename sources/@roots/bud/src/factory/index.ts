import type {Config} from '@roots/bud-framework'
import {dirname} from 'node:path'
import {fileURLToPath} from 'node:url'

import Bud from '../bud.js'
import * as context from '../context/index.js'
import {config} from './config.js'
import {mergeOptions} from './options.js'

/**
 * Cached instances
 *
 * @public
 */
let instances: Array<Bud> = []

const get = (basedir?: string) => {
  basedir = basedir ?? dirname(fileURLToPath(import.meta.url))
  const cached = instances.find(
    instance => instance.context.basedir === basedir,
  )
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
  overrides?: Config.Overrides,
  skipCache = false,
): Promise<Bud> {
  const basedir =
    overrides?.basedir ?? dirname(fileURLToPath(import.meta.url))

  if (skipCache !== true) {
    const cached = instances.find(
      instance => instance.context.basedir === basedir,
    )

    if (cached) {
      cached.log(`using cached instance`)
      return cached
    }
  }

  const ctx = await context.get(basedir)

  Array.isArray(overrides?.extensions) &&
    overrides.extensions
      .filter(extension => !ctx?.extensions.includes(extension))
      .map(extension => ctx.extensions.push(extension))

  Array.isArray(overrides?.services) &&
    overrides.services
      .filter(service => !ctx?.services.includes(service))
      .map(service => ctx.services.push(service))

  const options = mergeOptions(ctx, overrides)
  const instance = await new Bud().lifecycle(options)

  instances.push(instance)

  try {
    await config(instance)
  } catch (error) {
    instance.error(error)
  }

  return instance
}

export {get, instances}
