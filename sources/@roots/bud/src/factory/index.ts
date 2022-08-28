import type {Config} from '@roots/bud-framework'

import Bud from '../bud.js'
import {basedir} from '../context/argv.js'
import * as context from '../context/index.js'
import {config} from './config.js'
import {mergeOptions} from './options.js'

/**
 * Cached instances
 *
 * @public
 */
let instances: Array<Bud> = []

const get = async (dir?: string) => {
  const projectPath = dir ?? basedir

  const cached = instances.find(
    instance => instance.context.basedir === projectPath,
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
  overrides?: Config.Overrides,
  skipCache = false,
  skipConfig = false,
): Promise<Bud> {
  const projectPath = overrides?.basedir ?? basedir

  if (skipCache !== true) {
    const cached = instances.find(
      instance => instance.context.basedir === projectPath,
    )

    if (cached) {
      cached.log(`using cached instance`)
      return cached
    }
  }

  const ctx = await context.get(projectPath)

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

  if (skipConfig !== true) {
    try {
      await config(instance)
    } catch (error) {
      instance.error(error)
    }
  }

  return instance
}

export {get, instances}
